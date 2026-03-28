'use client';

import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Tabs, 
  Modal, 
  Form, 
  Input,
  message,
  Popconfirm,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  VideoCameraOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface CategoryType {
  key: string;
  id: number;
  name: string;
  type: string;
  count: number;
  status: string;
}

const initialCategories: CategoryType[] = [
  { key: '1', id: 1, name: '电影', type: '影片类型', count: 234, status: '启用' },
  { key: '2', id: 2, name: '电视剧', type: '影片类型', count: 156, status: '启用' },
  { key: '3', id: 3, name: '综艺', type: '影片类型', count: 89, status: '启用' },
  { key: '4', id: 4, name: '动漫', type: '影片类型', count: 67, status: '启用' },
  { key: '5', id: 5, name: '纪录片', type: '影片类型', count: 45, status: '启用' },
  { key: '6', id: 6, name: '体育赛事', type: '影片类型', count: 23, status: '启用' },
];

const initialTags: CategoryType[] = [
  { key: '1', id: 1, name: '动作', type: '影片标签', count: 145, status: '启用' },
  { key: '2', id: 2, name: '喜剧', type: '影片标签', count: 132, status: '启用' },
  { key: '3', id: 3, name: '爱情', type: '影片标签', count: 98, status: '启用' },
  { key: '4', id: 4, name: '科幻', type: '影片标签', count: 87, status: '启用' },
  { key: '5', id: 5, name: '恐怖', type: '影片标签', count: 76, status: '启用' },
  { key: '6', id: 6, name: '悬疑', type: '影片标签', count: 65, status: '启用' },
  { key: '7', id: 7, name: '剧情', type: '影片标签', count: 234, status: '启用' },
  { key: '8', id: 8, name: '古装', type: '影片标签', count: 45, status: '启用' },
];

const initialCountries: CategoryType[] = [
  { key: '1', id: 1, name: '中国大陆', type: '国家/地区', count: 345, status: '启用' },
  { key: '2', id: 2, name: '美国', type: '国家/地区', count: 234, status: '启用' },
  { key: '3', id: 3, name: '日本', type: '国家/地区', count: 156, status: '启用' },
  { key: '4', id: 4, name: '韩国', type: '国家/地区', count: 98, status: '启用' },
  { key: '5', id: 5, name: '英国', type: '国家/地区', count: 67, status: '启用' },
  { key: '6', id: 6, name: '法国', type: '国家/地区', count: 45, status: '启用' },
];

export default function CategoriesManagement() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState(initialCategories);
  const [tags, setTags] = useState(initialTags);
  const [countries, setCountries] = useState(initialCountries);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryType | null>(null);
  const [form] = Form.useForm();

  const getDataByTab = () => {
    switch (activeTab) {
      case 'categories':
        return categories;
      case 'tags':
        return tags;
      case 'countries':
        return countries;
      default:
        return [];
    }
  };

  const setDataByTab = (newData: CategoryType[]) => {
    switch (activeTab) {
      case 'categories':
        setCategories(newData);
        break;
      case 'tags':
        setTags(newData);
        break;
      case 'countries':
        setCountries(newData);
        break;
    }
  };

  const getTabName = () => {
    switch (activeTab) {
      case 'categories':
        return '分类';
      case 'tags':
        return '标签';
      case 'countries':
        return '国家/地区';
      default:
        return '';
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: CategoryType) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const data = getDataByTab();
    setDataByTab(data.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const data = getDataByTab();
      
      if (editingItem) {
        setDataByTab(data.map(item => 
          item.id === editingItem.id ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newItem: CategoryType = {
          key: Date.now().toString(),
          id: Date.now(),
          ...values,
          count: 0,
          type: activeTab === 'categories' ? '影片类型' : activeTab === 'tags' ? '影片标签' : '国家/地区',
        };
        setDataByTab([...data, newItem]);
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: '关联数量',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      render: (count: number) => count || 0,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '启用' ? 'success' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
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
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'categories',
      label: (
        <span>
          <FolderOutlined />
          影片类型
        </span>
      ),
    },
    {
      key: 'tags',
      label: (
        <span>
          <VideoCameraOutlined />
          影片标签
        </span>
      ),
    },
    {
      key: 'countries',
      label: (
        <span>
          <GlobalOutlined />
          国家/地区
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>分类管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加{getTabName()}
        </Button>
      </div>

      <Card>
        <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} />
        
        <Table
          columns={columns}
          dataSource={getDataByTab()}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? `编辑${getTabName()}` : `添加${getTabName()}`}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={500}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: `请输入${getTabName()}名称` }]}
          >
            <Input placeholder={`请输入${getTabName()}名称`} />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
            initialValue="启用"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Switch 
                defaultChecked 
                checkedChildren="启用" 
                unCheckedChildren="禁用"
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
