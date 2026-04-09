'use client';

import {Button, Col, Form, Image, Input, Row, Select} from "antd";
import RichTextEditor from "@/components/RichTextEditor";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {useTranslations} from "@/contexts/LocaleContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {CategoryCheckboxGroup} from "@/components/backend/CategoryCheckboxGroup";
import {useBackendApp} from "@/contexts/BackendAppProvider";

const {TextArea} = Input;

export interface PostFormProps {
    onSubmit?: (values: any) => Promise<void>;
    initialValues?: any;
    submitting?: boolean;
}

export const PostForm = ({
                             initialValues = {},
                             submitting = false,
                             onSubmit,
                         }: PostFormProps) => {
    const [form] = Form.useForm();
    const {t} = useTranslations('posts');
    const router = useRouter();
    const {mediaLibrary} = useBackendApp();

    const [content, setContent] = useState(initialValues.content || '');
    const [coverUrl, setCoverUrl] = useState(initialValues.thumbnail || '');
    const [categories, setCategories] = useState(initialValues.categories || [])

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
            onFinish={onSubmit}
            autoComplete="off"
            initialValues={initialValues}
        >
            <Row gutter={24}>
                {/* 左栏 */}
                <Col xs={24} lg={18}>
                    <Form.Item
                        label={t('title')}
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题"/>
                    </Form.Item>

                    <Form.Item
                        label={t('slug')}
                        name="slug"
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
                        <RichTextEditor placeholder={t('contentPlaceholder')}/>
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
                        label={t('category')}
                        name="categories"
                    >
                        <CategoryCheckboxGroup/>
                    </Form.Item>

                    <Form.Item
                        label={t('author')}
                        name="author"
                    >
                        <Input placeholder={t('authorPlaceholder')}/>
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
                    <Form.Item style={{marginTop: 24}}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            保存
                        </Button>
                        <Button
                            style={{marginLeft: 12}}
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
