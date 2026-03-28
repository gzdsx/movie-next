'use client';

import React, {useState} from 'react';
import {
    Table,
    Card,
    Button,
    Space,
    Tag,
    Input,
    Select,
    Pagination, App,
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {apiGet, apiDelete, apiPut} from "@/lib/backendApi";
import Link from "next/link";
import {useBackendApp} from "@/app/(backend)/admin/_components/BackendAppProvider";

const {Search} = Input;
const {Option} = Select;

interface MovieType {
    key: string;
    id: number;
    title: string;
    type: string;
    type_desc: string;
    category: string;
    year: number;
    rating: number;
    views: number;
    status: string;
    thumbnail: string;
    url: string;
    vid: string;
}

export default function MoviesManagement() {
    const [total, setTotal] = useState<number>(0);
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [batchAction, setBatchAction] = useState<string>('');

    const {message} = App.useApp();
    const {mediaLibrary} = useBackendApp();

    const handleAdd = () => {
        mediaLibrary.open({
            multiple: true,
            onSelect: (medias) => {
                //console.log(medias);
            }
        });
    };

    const handleEdit = (record: MovieType) => {

    };

    const columns: ColumnsType<MovieType> = [
        {
            title: 'Cover',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 60,
            render: (thumbnail: string) => (
                <img src={thumbnail} alt={thumbnail} className={'w-10 h-10 rounded-md'}/>
            )
        },
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            width: 'auto',
            render: (title: string, record: MovieType) => (
                <Link href={record.url} target="_blank">
                    <strong className={'text-gray-600 hover:text-blue-500'}>{title}</strong>
                </Link>
            )
        },
        {
            title: '类型',
            dataIndex: 'type_des',
            key: 'type',
            width: 100,
        },
        {
            title: '播放量',
            dataIndex: 'views',
            key: 'views',
            width: 120,
            render: (views: number) => views.toLocaleString(),
        },
        {
            title: '状态',
            dataIndex: 'status_des',
            key: 'status',
            width: 100,
            render: (status: string, record: MovieType) => {
                const color = record.status === 'publish' ? 'success' : 'error';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: '时间',
            dataIndex: 'created_at',
            key: 'time',
            width: 180,
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'end',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(record)}
                        className={'px-0'}
                    >
                        编辑
                    </Button>
                </Space>
            ),
        },
    ];

    const fetchMovies = () => {
        setLoading(true);
        apiGet('/movies', {
            q: searchText,
            type: filterType,
            status: filterStatus,
            offset,
            limit: 20,
        }).then(response => {
            const {items, total} = response.data;
            setTotal(total);
            setMovies([...items]);
        }).catch(reason => {
            message.error(reason.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleBatchAction = () => {
        if (batchAction === 'delete') {
            setLoading(true);
            apiDelete(`/movies/batch`, {
                ids: selectedItems
            }).then(() => {
                message.success('删除成功');
                fetchMovies();
            }).catch(reason => {
                message.error(reason.message);
            }).finally(() => {
                setSelectedItems([]);
                setLoading(false);
            });
        }

        if (batchAction === 'publish') {
            setLoading(true);
            apiPut(`/movies/batch`, {
                ids: selectedItems,
                data: {
                    status: 'publish'
                }
            }).then(() => {
                message.success('影片上线成功');
                fetchMovies();
            }).catch(reason => {
                message.error(reason.message);
            }).finally(() => {
                setSelectedItems([]);
                setLoading(false);
            });
        }

        if (batchAction === 'unpublish') {
            setLoading(true);
            apiPut(`/movies/batch`, {
                ids: selectedItems,
                data: {
                    status: 'draft'
                }
            }).then(() => {
                message.success('影片下线成功');
                fetchMovies();
            }).catch(reason => {
                message.error(reason.message);
            }).finally(() => {
                setSelectedItems([]);
                setLoading(false);
            });
        }
    }

    React.useEffect(() => {
        fetchMovies();
    }, [offset, filterType, filterStatus]);

    return (
        <div>
            <h2 style={{marginBottom: 24, fontSize: 24, fontWeight: 'bold'}}>影片管理</h2>
            <Card>
                <div style={{marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap'}}>
                    <Search
                        placeholder="搜索影片名称"
                        allowClear
                        style={{width: 250}}
                        onSearch={(value) => {
                            setSearchText(value);
                            fetchMovies();
                        }}
                        prefix={<SearchOutlined/>}
                    />
                    <Select
                        defaultValue="全部"
                        style={{width: 120}}
                        onChange={setFilterType}
                    >
                        <Option value="all">全部类型</Option>
                        <Option value="film">电影</Option>
                        <Option value="tv">电视剧</Option>
                        <Option value="variety">综艺</Option>
                        <Option value="anime">动漫</Option>
                        <Option value="documentary">纪录片</Option>
                        <Option value="match">体育赛事</Option>
                    </Select>
                    <Select
                        defaultValue="全部"
                        style={{width: 120}}
                        onChange={setFilterStatus}
                    >
                        <Option value="all">全部状态</Option>
                        <Option value="publish">已上线</Option>
                        <Option value="draft">已下线</Option>
                    </Select>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                        添加影片
                    </Button>
                </div>

                <Table
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedItems,
                        onChange: (selectedRowKeys) => {
                            //console.log(selectedRowKeys, selectedRows);
                            setSelectedItems([...selectedRowKeys]);
                        },
                    }}
                    dataSource={movies}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    rowKey={record => record.id}
                />
                <div className={'flex justify-between items-center mt-4'}>
                    <div className={'grow flex flex-row gap-x-4'}>
                        <Select className={'w-40'} defaultValue={''} placeholder={'批量操作'}
                                onChange={(value) => setBatchAction(value)}>
                            <Option value={''}>批量操作</Option>
                            <Option value={'delete'}>删除</Option>
                            <Option value={'publish'}>上线</Option>
                            <Option value={'unpublish'}>下线</Option>
                        </Select>
                        <Button type="primary" disabled={selectedItems.length === 0}
                                onClick={handleBatchAction}>应用</Button>
                    </div>
                    <Pagination
                        total={total}
                        pageSize={20}
                        showSizeChanger={false}
                        showTotal={(total) => `共 ${total} 条记录`}
                        onChange={(page, pageSize) => {
                            setOffset((page - 1) * pageSize);
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}
