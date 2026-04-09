'use client';

import {useState} from "react";
import {useRouter} from 'next/navigation';
import {Form, Input, Select, Button, Row, Col, Image} from 'antd';
import {UploadOutlined, DeleteOutlined} from '@ant-design/icons';
import {useBackendApp} from "@/contexts/BackendAppProvider";
import {useTranslations} from '@/contexts/LocaleContext';
import RichTextEditor from '@/components/RichTextEditor';

const {TextArea} = Input;

export interface PageFormProps {
    initialValues?: any | undefined;
    onSubmit?: (values: any) => void;
    submitting?: boolean;
}

export const PageForm = ({initialValues = {}, onSubmit, submitting = false}: PageFormProps) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const {mediaLibrary} = useBackendApp();
    const {t} = useTranslations('pages');
    const [content, setContent] = useState(initialValues.content);
    const [coverUrl, setCoverUrl] = useState(initialValues.thumbnail);

    const handleSelectCover = (media: { src?: string }) => {
        form.setFieldValue('thumbnail', media.src);
        setCoverUrl(media.src as string);
    };

    const handleDeleteCover = () => {
        form.setFieldValue('thumbnail', '');
        setCoverUrl('');
    };

    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <Row gutter={24}>
                {/* 左栏 */}
                <Col xs={24} lg={18}>
                    <Form.Item
                        label={t('title')}
                        name="title"
                        rules={[{required: true, message: '请输入页面标题'}]}
                    >
                        <Input placeholder="请输入页面标题"/>
                    </Form.Item>

                    <Form.Item
                        label={t('slug')}
                        name="slug"
                        rules={[{message: '请输入 Slug'}]}
                    >
                        <Input placeholder={t('slugPlaceholder')}/>
                    </Form.Item>
                    <Form.Item
                        label={t('seoKeywords')}
                        name="keywords"
                    >
                        <Input placeholder={t('seoKeywordsPlaceholder')}/>
                    </Form.Item>
                    <Form.Item
                        label={t('excerpt')}
                        name="description"
                    >
                        <TextArea rows={3} placeholder={t('excerptPlaceholder')}/>
                    </Form.Item>

                    <Form.Item
                        label={t('content')}
                        name="content"
                        required
                    >
                        <RichTextEditor
                            value={content}
                            onChange={(value) => {
                                setContent(value);
                                form.setFieldValue('content', value);
                            }}
                        />
                    </Form.Item>
                </Col>

                {/* 右栏 */}
                <Col xs={24} lg={6}>
                    <Form.Item
                        label={t('cover')}
                        name="thumbnail"
                    >
                        <div>
                            {coverUrl ? (
                                <div style={{
                                    marginTop: 12,
                                    position: 'relative',
                                    display: 'inline-block',
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                }}>
                                    <style jsx>{`
                                        .delete-btn {
                                            opacity: 0;
                                            transition: opacity 0.2s;
                                        }

                                        .cover-container:hover .delete-btn {
                                            opacity: 1;
                                        }
                                    `}</style>
                                    <Image
                                        src={coverUrl}
                                        alt="封面"
                                        width={'100%'}
                                        style={{borderRadius: 8}}
                                    />
                                    <Button
                                        className="delete-btn"
                                        type="primary"
                                        danger
                                        size="small"
                                        icon={<DeleteOutlined/>}
                                        style={{position: 'absolute', top: 8, right: 8}}
                                        onClick={handleDeleteCover}
                                    />
                                </div>
                            ) : (
                                <Button
                                    icon={<UploadOutlined/>}
                                    onClick={() => {
                                        mediaLibrary.open({
                                            multiple: false,
                                            onSelect: (medias) => {
                                                handleSelectCover(medias[0]);
                                            },
                                        });
                                    }}
                                >
                                    选择封面
                                </Button>
                            )}
                        </div>
                    </Form.Item>

                    <Form.Item
                        label={t('status')}
                        name="status"
                        rules={[{required: true}]}
                    >
                        <Select>
                            <Select.Option value="draft">{t('draft')}</Select.Option>
                            <Select.Option value="publish">{t('published')}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={t('sortOrder')}
                        name="sort_num"
                    >
                        <Input type="number" placeholder="0"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            保存
                        </Button>
                        <Button
                            style={{marginLeft: 12}}
                            disabled={submitting}
                            onClick={() => router.back()}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
