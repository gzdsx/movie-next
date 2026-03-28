'use client';

import React, { useEffect, useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Modal, 
  Form, 
  Avatar,
  message,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  MailOutlined,
  SafetyOutlined,
  UserOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { apiGet } from '@/lib/api';

const { Search } = Input;
const { Option } = Select;

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  registerDate: string;
  lastLogin: string;
  status: string;
  avatar: string;
}

export default function UsersManagement() {
  const [total, setTotal] = useState<number>(0);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string>('全部');
  const [filterStatus, setFilterStatus] = useState<string>('全部');
  const [form] = Form.useForm();

  const handleEdit = (record: UserType) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleBan = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === '已封禁' ? '活跃' : '已封禁';
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    message.success(newStatus === '已封禁' ? '已封禁该用户' : '已解封该用户');
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...user, ...values } : user
        ));
        message.success('更新成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户信息',
      key: 'userInfo',
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#ff4d4f' }} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) => {
        const color = role === '管理员' ? 'purple' : role === 'VIP会员' ? 'gold' : 'default';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: '注册日期',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const color = status === '活跃' ? 'success' : status === '休眠' ? 'default' : status === '已封禁' ? 'error' : 'warning';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button type="link" size="small" icon={<MailOutlined />}>
            发邮件
          </Button>
          <Button type="link" size="small" icon={<SafetyOutlined />}>
            权限
          </Button>
          <Button 
            type="link" 
            size="small" 
            danger={record.status !== '已封禁'}
            icon={record.status === '已封禁' ? <CheckCircleOutlined /> : <StopOutlined />}
            onClick={() => handleBan(record.id, record.status)}
          >
            {record.status === '已封禁' ? '解封' : '封禁'}
          </Button>
        </Space>
      ),
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    apiGet('/users').then((response) => {
      const {total,items}=response.data;
      setUsers([...items]);
      setTotal(total);
    }).catch(() => {
      console.error('获取用户列表失败');
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, [offset]);

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 'bold' }}>用户管理</h2>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="总用户数" value={8549} valueStyle={{ color: '#262626' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="活跃用户" value={7234} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="VIP会员" value={856} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="今日新增" value={459} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Search
            placeholder="搜索用户名或邮箱"
            allowClear
            style={{ width: 250 }}
            onSearch={setSearchText}
            prefix={<SearchOutlined />}
          />
          <Select
            defaultValue="全部"
            style={{ width: 120 }}
            onChange={setFilterRole}
          >
            <Option value="全部">全部角色</Option>
            <Option value="普通用户">普通用户</Option>
            <Option value="VIP会员">VIP会员</Option>
            <Option value="管理员">管理员</Option>
          </Select>
          <Select
            defaultValue="全部"
            style={{ width: 120 }}
            onChange={setFilterStatus}
          >
            <Option value="全部">全部状态</Option>
            <Option value="活跃">活跃</Option>
            <Option value="休眠">休眠</Option>
            <Option value="已封禁">已封禁</Option>
            <Option value="待激活">待激活</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            添加用户
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            total,
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title="编辑用户"
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="username" label="用户名">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select>
              <Option value="普通用户">普通用户</Option>
              <Option value="VIP会员">VIP会员</Option>
              <Option value="管理员">管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select>
              <Option value="活跃">活跃</Option>
              <Option value="休眠">休眠</Option>
              <Option value="已封禁">已封禁</Option>
              <Option value="待激活">待激活</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
