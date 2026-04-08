'use client';

import {useState, useEffect} from 'react';
import {Form, Input, InputNumber, Select, Button, Card, message, Spin} from 'antd';
import {SaveOutlined} from '@ant-design/icons';
import {apiGet, apiPost} from "@/lib/backendApi";

const {Option} = Select;

interface MailConfig {
    mail_form_name: string;
    mail_form_address: string;
    mail_host: string;
    mail_port: number;
    mail_encryption: 'none' | 'ssl' | 'tls';
    mail_username: string;
    mail_password: string;
}

export default function MailSettingsPage() {
    const [form] = Form.useForm<MailConfig>();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMailConfig();
    }, []);

    const fetchMailConfig = async () => {
        setLoading(true);
        try {
            const response = await apiGet('/settings');
            const {mail_form_name, mail_form_address, mail_host, mail_port, mail_encryption, mail_username, mail_password} = response.data;
            form.setFieldsValue({
                mail_form_name,
                mail_form_address,
                mail_host,
                mail_port,
                mail_encryption,
                mail_username,
                mail_password
            });
        } catch (error) {
            message.error('加载邮件配置失败');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: MailConfig) => {
        setSaving(true);
        try {
            await apiPost(`/settings`,{
                mail_form_name: values.mail_form_name,
                mail_form_address: values.mail_form_address,
                mail_host: values.mail_host,
                mail_port: values.mail_port,
                mail_encryption: values.mail_encryption,
                mail_username: values.mail_username,
                mail_password: values.mail_password
            });
            message.success('设置已保存');
        } catch (error) {
            message.error('保存邮件配置失败');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{padding: 24}}>
            <Card title="SMTP 邮件配置">
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            mail_encryption: 'none',
                            mail_port: 25,
                        }}
                    >
                        <Form.Item
                            label="发件人姓名"
                            name="mail_form_name"
                            rules={[{required: true, message: '请输入发件人姓名'}]}
                        >
                            <Input placeholder="请输入发件人姓名" className={'w-80!'}/>
                        </Form.Item>

                        <Form.Item
                            label="发件人邮箱"
                            name="mail_form_address"
                            rules={[
                                {required: true, message: '请输入发件人邮箱'},
                                {type: 'email', message: '请输入有效的邮箱地址'},
                            ]}
                        >
                            <Input placeholder="example@domain.com" className={'w-120!'}/>
                        </Form.Item>

                        <Form.Item
                            label="SMTP 主机"
                            name="mail_host"
                            rules={[{required: true, message: '请输入 SMTP 主机'}]}
                        >
                            <Input placeholder="smtp.example.com" className={'w-80!'}/>
                        </Form.Item>

                        <Form.Item
                            label="SMTP 端口"
                            name="mail_port"
                            rules={[{required: true, message: '请输入 SMTP 端口'}]}
                        >
                            <InputNumber min={1} max={65535} style={{width: '100%'}} placeholder="25" className={'w-80!'}/>
                        </Form.Item>

                        <Form.Item
                            label="加密方式"
                            name="mail_encryption"
                            rules={[{required: true, message: '请选择加密方式'}]}
                        >
                            <Select className={'w-80!'}>
                                <Option value="none">无</Option>
                                <Option value="ssl">SSL</Option>
                                <Option value="tls">TLS</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="SMTP 用户名"
                            name="mail_username"
                            rules={[{required: true, message: '请输入 SMTP 用户名'}]}
                        >
                            <Input placeholder="请输入 SMTP 用户名" className={'w-80!'}/>
                        </Form.Item>

                        <Form.Item
                            label="SMTP 密码"
                            name="mail_password"
                            rules={[{required: true, message: '请输入 SMTP 密码'}]}
                        >
                            <Input.Password placeholder="请输入 SMTP 密码" className={'w-80!'}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} loading={saving}>
                                保存配置
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
}
