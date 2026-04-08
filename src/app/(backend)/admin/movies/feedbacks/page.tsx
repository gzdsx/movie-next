'use client';

import React, {useState, useEffect} from 'react';
import {Table, Button, message, Pagination, Flex, Space} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {apiGet} from "@/lib/backendApi";

interface MovieItem {
    id: string;
    title: string;
    url: string;
}

interface FeedbackItem {
    id: string;
    movie: MovieItem;
    content: string;
    created_at: string;
}

export default function Page() {
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataList, setDataList] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const fetchList = async () => {
        try {
            setLoading(true);
            const response = await apiGet('/movie-feedbacks', {
                offset,
                limit: 20,
            });
            const {items, total} = response.data;
            setTotal(total);
            setDataList([...items]);
        } catch (e) {
            message.error('加载数据失败');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchList();
    }, [offset]);

    const columns: ColumnsType<FeedbackItem> = [
        {
            title: '影片名称',
            dataIndex: 'movie.title',
            key: 'movie.title'
        },
        {
            title: '问题描述',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
            width: 180,
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    return (
        <div style={{padding: 0}}>
            <h2 style={{marginBottom: 24, fontSize: 24, fontWeight: 'bold'}}>问题反馈</h2>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataList}
                loading={loading}
                rowKey="id"
                pagination={false}
            />
            <Flex style={{marginTop: 20}}>
                <Space style={{flex: 1}}>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined/>}
                        disabled={selectedRowKeys.length === 0}
                    >
                        批量删除
                    </Button>
                </Space>
                <Pagination
                    total={total}
                    pageSize={20}
                    showSizeChanger={false}
                    showTotal={(total) => `共 ${total} 条记录`}
                    onChange={(page, pageSize) => {
                        setOffset((page - 1) * pageSize);
                    }}
                />
            </Flex>
        </div>
    );
}
