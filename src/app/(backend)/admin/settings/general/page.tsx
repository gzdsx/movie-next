'use client';

import React, {useEffect} from 'react';
import {
    Card,
    Form,
    Input,
    Switch,
    Button,
    Divider,
    Row,
    Col,
    App
} from 'antd';
import {
    GlobalOutlined,
    SafetyOutlined,
    DatabaseOutlined,
    BellOutlined,
    ReloadOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import {apiGet, apiPost} from "@/lib/backendApi";

export default function SettingsPage() {
    const [form] = Form.useForm();
    const {message} = App.useApp();

    const handleSubmit = async (values: {
        sitename: string;
        keywords: string;
        description: string;
        admin_email: string;
        allow_registration: boolean;
        require_email_verification: boolean;
        allow_comments: boolean;
        require_comment_approval: boolean;
        max_upload_size: number;
        allowed_video_formats: string;
        notification_email: string;
        notification_interval: number;
    }) => {
        await apiPost(`/settings`, values);
        message.success('设置已保存');
    };

    useEffect(() => {
        (async function () {
            const response = await apiGet(`/settings`);
            const {sitename, keywords, description, admin_email} = response.data;
            form.setFieldsValue({
                sitename,
                keywords,
                description,
                admin_email
            })
        })()
    }, [form]);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
                <h2 style={{fontSize: 24, fontWeight: 'bold', margin: 0}}>系统设置</h2>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                {/* Site Settings */}
                <Card
                    title={
                        <span>
                          <GlobalOutlined style={{marginRight: 8, color: '#ff4d4f'}}/>
                          网站设置
                        </span>
                    }
                    style={{marginBottom: 16}}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item label="网站名称" name="sitename">
                                <Input placeholder="请输入网站名称"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="管理员邮箱" name="admin_email">
                                <Input placeholder="请输入联系邮箱"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="关键词" name="keywords">
                        <Input placeholder="请输入网站关键词"/>
                    </Form.Item>
                    <Form.Item label="网站描述" name="description">
                        <Input.TextArea rows={3} placeholder="请输入网站描述"/>
                    </Form.Item>
                </Card>

                {/* User Settings */}
                <Card
                    title={
                        <span>
                          <SafetyOutlined style={{marginRight: 8, color: '#ff4d4f'}}/>
                          用户设置
                        </span>
                    }
                    style={{marginBottom: 16}}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="允许用户注册"
                                name="allow_registration"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <Switch defaultChecked/>
                                    <span style={{color: '#8c8c8c', fontSize: 12}}>关闭后用户将无法注册新账户</span>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="邮箱验证"
                                name="require_email_verification"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <Switch defaultChecked/>
                                    <span style={{color: '#8c8c8c', fontSize: 12}}>新用户注册后需要验证邮箱</span>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider/>

                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="允许评论"
                                name="allow_comments"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <Switch defaultChecked/>
                                    <span style={{color: '#8c8c8c', fontSize: 12}}>用户可以在视频下方发表评论</span>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="评论审核"
                                name="require_comment_approval"
                                valuePropName="checked"
                                initialValue={false}
                            >
                                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <Switch/>
                                    <span
                                        style={{color: '#8c8c8c', fontSize: 12}}>用户评论需要管理员审核后才能显示</span>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Upload Settings */}
                <Card
                    title={
                        <span>
                          <DatabaseOutlined style={{marginRight: 8, color: '#ff4d4f'}}/>
                          上传设置
                        </span>
                    }
                    style={{marginBottom: 16}}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="最大上传大小 (MB)"
                                name="max_upload_Size"
                                initialValue="500"
                            >
                                <Input type="number" placeholder="请输入最大上传大小"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="允许的视频格式"
                                name="allowed_video_formats"
                                initialValue="mp4, mkv, avi"
                            >
                                <Input placeholder="多个格式用逗号分隔"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Notification Settings */}
                <Card
                    title={
                        <span>
                          <BellOutlined style={{marginRight: 8, color: '#ff4d4f'}}/>
                          通知设置
                        </span>
                    }
                    style={{marginBottom: 16}}
                >
                    <Form.Item
                        label="系统通知"
                        name="enable_notifications"
                        valuePropName="checked"
                        initialValue={true}
                    >
                        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                            <Switch defaultChecked/>
                            <span style={{color: '#8c8c8c', fontSize: 12}}>接收系统重要通知</span>
                        </div>
                    </Form.Item>
                </Card>

                {/* Maintenance Mode */}
                <Card
                    title={
                        <span>
                          <ReloadOutlined style={{marginRight: 8, color: '#ff4d4f'}}/>
                          维护模式
                        </span>
                    }
                >
                    <Form.Item
                        label="启用维护模式"
                        name="maintenance_mode"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                            <Switch/>
                            <span style={{color: '#8c8c8c', fontSize: 12}}>开启后网站将暂停对外服务</span>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined/>}>
                            保存配置
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
