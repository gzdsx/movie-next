'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Progress, List, Avatar } from 'antd';
import {
  ArrowUpOutlined,
  EyeOutlined,
  UserOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const weeklyData = [
  { day: '周一', views: 12500, users: 450 },
  { day: '周二', views: 13200, users: 480 },
  { day: '周三', views: 14800, users: 520 },
  { day: '周四', views: 13900, users: 490 },
  { day: '周五', views: 15600, users: 560 },
  { day: '周六', views: 18200, users: 680 },
  { day: '周日', views: 19500, users: 720 },
];

const monthlyData = [
  { month: '8月', views: 320000, growth: '+12%' },
  { month: '9月', views: 380000, growth: '+18%' },
  { month: '10月', views: 420000, growth: '+10%' },
  { month: '11月', views: 480000, growth: '+14%' },
  { month: '12月', views: 520000, growth: '+8%' },
  { month: '1月', views: 580000, growth: '+11%' },
];

const topCategories = [
  { name: '电影', views: 234567, percentage: 45 },
  { name: '电视剧', views: 123456, percentage: 23 },
  { name: '综艺', views: 89012, percentage: 17 },
  { name: '动漫', views: 67890, percentage: 13 },
  { name: '纪录片', views: 23456, percentage: 2 },
];

const userGrowth = [
  { date: '本周', newUsers: 890, active: 7845, growth: '+15%' },
  { date: '本月', newUsers: 3456, active: 32456, growth: '+23%' },
  { date: '本季度', newUsers: 9876, active: 85490, growth: '+31%' },
];

export default function AnalyticsPage() {
  const maxViews = Math.max(...weeklyData.map(d => d.views));

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 'bold' }}>数据统计</h2>

      {/* Overview Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总播放量"
              value={1.2}
              suffix="M"
              prefix={<EyeOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#262626' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#52c41a', fontSize: 14 }}>
                <ArrowUpOutlined /> 18%
              </span>
              <span style={{ color: '#8c8c8c', fontSize: 12, marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="注册用户"
              value={8549}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#262626' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#52c41a', fontSize: 14 }}>
                <ArrowUpOutlined /> 23%
              </span>
              <span style={{ color: '#8c8c8c', fontSize: 12, marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="今日播放"
              value={45.6}
              suffix="K"
              prefix={<PlayCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#262626' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#52c41a', fontSize: 14 }}>
                <ArrowUpOutlined /> 12%
              </span>
              <span style={{ color: '#8c8c8c', fontSize: 12, marginLeft: 8 }}>较昨日</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均观看时长"
              value={12.5}
              suffix="分钟"
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#262626' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#52c41a', fontSize: 14 }}>
                <ArrowUpOutlined /> 8%
              </span>
              <span style={{ color: '#8c8c8c', fontSize: 12, marginLeft: 8 }}>较上周</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Weekly Views Chart */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="本周播放量趋势">
            <div style={{ display: 'flex', alignItems: 'flex-end', height: 250, gap: 16 }}>
              {weeklyData.map((data, index) => {
                const height = (data.views / maxViews) * 100;
                return (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      width: '100%', 
                      height: `${height}%`, 
                      backgroundColor: '#ff4d4f',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: -24,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 12,
                        color: '#8c8c8c',
                      }}>
                        {(data.views / 1000).toFixed(1)}K
                      </div>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>{data.day}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="月度增长趋势">
            <List
              itemLayout="horizontal"
              dataSource={monthlyData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#f0f0f0', color: '#262626' }}>
                        {item.month}
                      </Avatar>
                    }
                    title={`${(item.views / 1000).toFixed(0)}K 播放量`}
                    description="月度统计"
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{item.growth}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Category Distribution & User Growth */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="分类播放占比">
            {topCategories.map((category, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{category.name}</span>
                  <span style={{ color: '#8c8c8c' }}>{category.percentage}%</span>
                </div>
                <Progress 
                  percent={category.percentage} 
                  strokeColor="#ff4d4f" 
                  showInfo={false}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="用户增长统计">
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={userGrowth}
              renderItem={(item) => (
                <List.Item>
                  <Card size="small" style={{ background: '#fafafa' }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic title="时间段" value={item.date} valueStyle={{ fontSize: 16 }} />
                      </Col>
                      <Col span={8}>
                        <Statistic 
                          title="新增用户" 
                          value={item.newUsers} 
                          valueStyle={{ fontSize: 16, color: '#52c41a' }}
                          prefix="+"
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic 
                          title="活跃用户" 
                          value={item.active} 
                          valueStyle={{ fontSize: 16 }}
                        />
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Insights */}
      <Card 
        style={{ marginTop: 16 }}
        title={
          <span>
            <LineChartOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />
            数据洞察
          </span>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card style={{ background: '#fff1f0', border: 'none' }}>
              <Statistic
                title="最佳时段"
                value="周末 20:00-22:00"
                valueStyle={{ fontSize: 16, color: '#262626' }}
              />
              <div style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>用户活跃度最高</div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ background: '#e6f7ff', border: 'none' }}>
              <Statistic
                title="热门分类"
                value="电影"
                valueStyle={{ fontSize: 16, color: '#262626' }}
              />
              <div style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>占比 45% 的播放量</div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ background: '#f6ffed', border: 'none' }}>
              <Statistic
                title="用户留存"
                value={68}
                suffix="%"
                valueStyle={{ fontSize: 16, color: '#262626' }}
              />
              <div style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>7日留存率</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
