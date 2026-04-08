'use client';

import React from 'react';
import {Card, Col, Row, Statistic, Table, Progress, List, Avatar, Tag} from 'antd';
import {
    VideoCameraOutlined,
    UserOutlined,
    EyeOutlined,
    CommentOutlined,
    ArrowUpOutlined,
    StarOutlined,
} from '@ant-design/icons';

const {Column} = Table;

const statsData = [
    {
        title: '影片总数',
        value: 1234,
        icon: <VideoCameraOutlined style={{fontSize: 32, color: '#ff4d4f'}}/>,
        suffix: '部'
    },
    {title: '用户总数', value: 8549, icon: <UserOutlined style={{fontSize: 32, color: '#1890ff'}}/>, suffix: '人'},
    {title: '今日播放', value: 45678, icon: <EyeOutlined style={{fontSize: 32, color: '#52c41a'}}/>, suffix: '次'},
    {title: '评论总数', value: 12345, icon: <CommentOutlined style={{fontSize: 32, color: '#faad14'}}/>, suffix: '条'},
];

const recentMoviesData = [
    {key: '1', title: '阿凡达：水之道', views: 12580, date: '2024-01-15', status: '已上线', rating: 9.2},
    {key: '2', title: '流浪地球2', views: 10234, date: '2024-01-14', status: '已上线', rating: 8.9},
    {key: '3', title: '奥本海默', views: 9876, date: '2024-01-13', status: '已上线', rating: 9.0},
    {key: '4', title: '沙丘2', views: 8654, date: '2024-01-12', status: '待审核', rating: 9.1},
    {key: '5', title: '哥斯拉大战金刚', views: 7432, date: '2024-01-11', status: '已上线', rating: 8.5},
];

const topMoviesData = [
    {id: 1, title: '肖申克的救赎', views: 89234, rating: 9.7},
    {id: 2, title: '霸王别姬', views: 78456, rating: 9.6},
    {id: 3, title: '阿甘正传', views: 67890, rating: 9.5},
    {id: 4, title: '泰坦尼克号', views: 56789, rating: 9.4},
    {id: 5, title: '星际穿越', views: 45678, rating: 9.3},
];

const categoryData = [
    {name: '电影', value: 45},
    {name: '电视剧', value: 23},
    {name: '综艺', value: 17},
    {name: '动漫', value: 13},
    {name: '纪录片', value: 2},
];

export default function AdminDashboard() {
    return (
        <div>
            <h2 style={{marginBottom: 24, fontSize: 24, fontWeight: 'bold'}}>仪表盘</h2>

            {/* Stats Cards */}
            <Row gutter={[16, 16]}>
                {statsData.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div>
                                    <div style={{color: '#8c8c8c', fontSize: 14, marginBottom: 8}}>{stat.title}</div>
                                    <Statistic
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        valueStyle={{fontSize: 28, fontWeight: 'bold'}}
                                    />
                                </div>
                                {stat.icon}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} style={{marginTop: 16}}>
                <Col xs={24} lg={14}>
                    <Card title="最近添加的影片" extra={<a href="#">查看更多</a>}>
                        <Table dataSource={recentMoviesData} pagination={false} size="middle">
                            <Column title="影片名称" dataIndex="title" key="title"/>
                            <Column
                                title="播放量"
                                dataIndex="views"
                                key="views"
                                render={(views: number) => views.toLocaleString()}
                            />
                            <Column title="添加日期" dataIndex="date" key="date"/>
                            <Column
                                title="评分"
                                dataIndex="rating"
                                key="rating"
                                render={(rating: number) => (
                                    <span>
                    <StarOutlined style={{color: '#faad14', marginRight: 4}}/>
                                        {rating}
                  </span>
                                )}
                            />
                            <Column
                                title="状态"
                                dataIndex="status"
                                key="status"
                                render={(status: string) => (
                                    <Tag color={status === '已上线' ? 'success' : 'warning'}>
                                        {status}
                                    </Tag>
                                )}
                            />
                        </Table>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title="热门影片排行">
                        <List
                            itemLayout="horizontal"
                            dataSource={topMoviesData}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{backgroundColor: index < 3 ? '#ff4d4f' : '#8c8c8c'}}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        }
                                        title={item.title}
                                        description={`播放量: ${item.views.toLocaleString()}`}
                                    />
                                    <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                                        <StarOutlined style={{color: '#faad14'}}/>
                                        <span style={{fontWeight: 'bold'}}>{item.rating}</span>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Category Distribution */}
            <Row gutter={[16, 16]} style={{marginTop: 16}}>
                <Col xs={24} lg={12}>
                    <Card title="分类播放占比">
                        {categoryData.map((item, index) => (
                            <div key={index} style={{marginBottom: 16}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                                    <span>{item.name}</span>
                                    <span>{item.value}%</span>
                                </div>
                                <Progress percent={item.value} strokeColor="#ff4d4f" showInfo={false}/>
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="数据概览">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card style={{background: '#fff1f0', border: 'none'}}>
                                    <Statistic
                                        title="本月总播放量"
                                        value={1.2}
                                        suffix="M"
                                        prefix={<ArrowUpOutlined style={{color: '#52c41a'}}/>}
                                        valueStyle={{color: '#262626'}}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card style={{background: '#e6f7ff', border: 'none'}}>
                                    <Statistic
                                        title="本周新增用户"
                                        value={567}
                                        prefix={<ArrowUpOutlined style={{color: '#52c41a'}}/>}
                                        valueStyle={{color: '#262626'}}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card style={{background: '#f6ffed', border: 'none'}}>
                                    <Statistic
                                        title="今日新增评论"
                                        value={890}
                                        prefix={<CommentOutlined style={{color: '#52c41a'}}/>}
                                        valueStyle={{color: '#262626'}}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card style={{background: '#fffbe6', border: 'none'}}>
                                    <Statistic
                                        title="用户留存率"
                                        value={68}
                                        suffix="%"
                                        valueStyle={{color: '#262626'}}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
