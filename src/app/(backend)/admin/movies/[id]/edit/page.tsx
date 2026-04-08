'use client';

import {useState, useEffect} from 'react';
import {Form, Input, InputNumber, Select, Button, Spin, Image, Row, Col, Card, App} from 'antd';
import {UploadOutlined, DeleteOutlined} from '@ant-design/icons';
import {useRouter, useParams} from 'next/navigation';
import {apiGet, apiPut, apiPost} from '@/lib/backendApi';
import {useBackendApp} from "@/app/(backend)/admin/_components/BackendAppProvider";

const {TextArea} = Input;

export default function MovieEditPage() {
    const router = useRouter();
    const params = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [coverUrl, setCoverUrl] = useState('');
    const [movieData, setMovieData] = useState({});

    const {mediaLibrary} = useBackendApp();
    const {message} = App.useApp();

    useEffect(() => {
        if (Number(params.id) > 0) {
            fetchMovieDetail();
        } else {
            setLoading(false);
        }
    }, [params.id]);

    const fetchMovieDetail = async () => {
        try {
            setLoading(true);
            const response = await apiGet(`/movies/${params.id}`);
            const data = response.data;
            setMovieData({
                title: data.title,
                directors: data.directors,
                actors: data.actors,
                description: data.description,
                thumbnail: data.thumbnail,
                type: data.type,
                regions: data.regions ? data.regions.split(',') : [],
                year: data.year,
                tags: data.tags ? data.tags.split(',') : [],
                views: data.views
            });
            setCoverUrl(data.thumbnail);
        } catch (error) {
            console.error('Failed to fetch movie detail:', error);
            message.error('获取影片详情失败');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: unknown) => {
        const typedValues = values as {
            title: string;
            directors: string;
            actors: string;
            description: string;
            thumbnail: string;
            type: string;
            regions: string[];
            year: number;
            tags: string[];
            views: number;
        };
        const movieData = {
            title: typedValues.title,
            directors: typedValues.directors,
            actors: typedValues.actors,
            description: typedValues.description,
            thumbnail: typedValues.thumbnail,
            type: typedValues.type,
            regions: typedValues.regions.join(','),
            year: typedValues.year,
            tags: typedValues.tags.join(','),
            views: typedValues.views
        }
        try {
            setSubmitting(true);
            if (params.id === '0') {
                const response = await apiPost('/movies', movieData);
                const data = response.data;
                message.success('创建成功');
                router.push(`/admin/movies/${data.id}/edit`);
            } else {
                await apiPut(`/movies/${params.id}`, movieData);
                message.success('更新成功');
            }
        } catch (error: any) {
            console.error('Failed to update movie:', error);
            message.error(error?.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSelectCover = (media: { src?: string }) => {
        form.setFieldValue('thumbnail', media.src);
        setCoverUrl(media.src as string);
    };

    const handleDeleteCover = () => {
        form.setFieldValue('thumbnail', '');
        setCoverUrl('');
    };

    const regionOptions = [
        {value: '中国大陆', label: '中国大陆'},
        {value: '香港', label: '香港'},
        {value: '台湾', label: '台湾'},
        {value: '美国', label: '美国'},
        {value: '日本', label: '日本'},
        {value: '韩国', label: '韩国'},
        {value: '英国', label: '英国'},
        {value: '法国', label: '法国'},
        {value: '德国', label: '德国'},
        {value: '印度', label: '印度'},
        {value: '泰国', label: '泰国'},
        {value: '其他', label: '其他'},
    ];

    const typeOptions = [
        {value: 'film', label: '电影'},
        {value: 'tv', label: '电视剧'},
        {value: 'documentary', label: '纪录片'},
        {value: 'animate', label: '动画'},
        {value: 'variety', label: '综艺'},
        {value: 'match', label: '体育赛事'},
    ];

    const tagOptions = [
        {value: '动作', label: '动作'},
        {value: '喜剧', label: '喜剧'},
        {value: '爱情', label: '爱情'},
        {value: '科幻', label: '科幻'},
        {value: '悬疑', label: '悬疑'},
        {value: '恐怖', label: '恐怖'},
        {value: '剧情', label: '剧情'},
        {value: '战争', label: '战争'},
        {value: '历史', label: '历史'},
        {value: '犯罪', label: '犯罪'},
        {value: '奇幻', label: '奇幻'},
        {value: '冒险', label: '冒险'},
    ];

    return (
        <Card title="编辑影片" variant={'borderless'} loading={loading}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
                initialValues={movieData}
            >
                <Row gutter={24}>
                    {/* 左栏 */}
                    <Col xs={24} lg={18}>
                        <Form.Item
                            label="影片名称"
                            name="title"
                            rules={[{required: true, message: '请输入影片名称'}]}
                        >
                            <Input placeholder="请输入影片名称"/>
                        </Form.Item>

                        <Form.Item
                            label="导演"
                            name="directors"
                            rules={[{required: true, message: '请输入导演'}]}
                        >
                            <Input placeholder="请输入导演"/>
                        </Form.Item>

                        <Form.Item
                            label="主演"
                            name="actors"
                            rules={[{required: true, message: '请输入主演'}]}
                        >
                            <Input placeholder="请输入主演，多个演员用逗号分隔"/>
                        </Form.Item>

                        <Form.Item
                            label="剧情介绍"
                            name="description"
                            rules={[{required: true, message: '请输入剧情介绍'}]}
                        >
                            <TextArea rows={6} placeholder="请输入剧情介绍"/>
                        </Form.Item>
                    </Col>

                    {/* 右栏 */}
                    <Col xs={24} lg={6}>
                        <Form.Item
                            label="封面图片"
                            name="thumbnail"
                            rules={[{required: true, message: '请选择封面图片'}]}
                        >
                            <div>
                                {coverUrl ? (
                                    <div
                                        style={{
                                            marginTop: 12,
                                            position: 'relative',
                                            display: 'inline-block',
                                            borderRadius: 8,
                                            overflow: 'hidden'
                                        }}
                                        className="cover-container"
                                    >
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
                                                onSelect: (medias) => {
                                                    handleSelectCover(medias[0]);
                                                }
                                            });
                                        }}
                                    >
                                        选择封面
                                    </Button>
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="影片类型"
                            name="type"
                            rules={[{required: true, message: '请选择影片类型'}]}
                        >
                            <Select placeholder="请选择影片类型" options={typeOptions}/>
                        </Form.Item>

                        <Form.Item
                            label="地区"
                            name="regions"
                            rules={[{required: true, message: '请选择地区'}]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="请选择地区（可多选）"
                                options={regionOptions}
                                maxTagCount={5}
                            />
                        </Form.Item>
                        <Form.Item
                            label="年份"
                            name="year"
                            rules={[{required: true, message: '请输入年份'}]}
                        >
                            <InputNumber
                                placeholder="请输入年份"
                                min={1900}
                                max={2100}
                                style={{width: '100%'}}
                            />
                        </Form.Item>

                        <Form.Item
                            label="观看次数"
                            name="views"
                        >
                            <InputNumber
                                placeholder="请输入观看次数"
                                min={0}
                                style={{width: '100%'}}
                            />
                        </Form.Item>

                        <Form.Item
                            label="标签"
                            name="tags"
                        >
                            <Select
                                mode="tags"
                                placeholder="请输入标签，按回车添加"
                                tokenSeparators={[',']}
                                options={tagOptions}
                            />
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
        </Card>
    );
}
