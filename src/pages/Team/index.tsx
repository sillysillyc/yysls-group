import { Button, Card, Form, Input, Select, List, Tag, notification } from 'antd';
import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';

const dungeonTypeMap = {
  weekly: 'weekly',
  trial: 'trial',
};

type DungeonType = ValueOf<typeof dungeonTypeMap>;

const visibilityMap = {
  all: 'all',
  guild: 'guild',
};

type Visibility = ValueOf<typeof visibilityMap>;

const statusMap = {
  recruiting: 'recruiting',
  fighting: 'fighting',
} as const;

type Status = ValueOf<typeof statusMap>;

type TeamType = {
  id: string;
  name: string;
  visibility: Visibility;
  status: Status;
  dungeonType: DungeonType;
  members: string[];
  creator: string;
};

export default function TeamPage() {
  const [form] = Form.useForm();

  const [teams, setTeams] = useState<TeamType[]>([]);
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('recruiting');
  const { username } = useUserStore();
  const onFinish = (values: { name?: string }) => {
    const newTeam = {
      id: Math.random().toString(36).slice(2, 11),
      name: values.name || `${useUserStore.getState().username}的队伍`,
      visibility: visibilityMap.all,
      status: statusMap.recruiting,
      dungeonType: dungeonTypeMap.weekly,
      members: [username || ''],
      creator: username || '',
    };
    setTeams([...teams, newTeam]);
    notification.success({ message: '队伍创建成功' });
    form.resetFields();
  };

  const filteredTeams = teams.filter(
    (team) => (visibilityFilter === 'all' || team.visibility === visibilityFilter) && team.status === statusFilter
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={(value) => setVisibilityFilter(value)}
          options={[
            { value: 'all', label: '全部' },
            { value: 'guild', label: '百业' },
          ]}
        />
        <Select
          defaultValue="recruiting"
          style={{ width: 120 }}
          onChange={(value) => setStatusFilter(value)}
          options={[
            { value: 'recruiting', label: '召集中' },
            { value: 'fighting', label: '攻坚中' },
          ]}
        />
      </div>

      <div style={{ maxWidth: 800, marginBottom: 24 }}>
        <Card title="创建新队伍">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="队伍名称" name="name">
              <Input placeholder={`默认名称：${localStorage.getItem('username')}的队伍`} />
            </Form.Item>

            <Form.Item label="副本类型" name="dungeonType" initialValue="weekly" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="weekly">周本（最大10人）</Select.Option>
                <Select.Option value="trial">试剑（最大5人）</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                创建队伍
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredTeams}
        renderItem={(team) => (
          <List.Item>
            <Card title={team.name}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Tag color={team.status === 'recruiting' ? 'green' : 'red'}>
                  {team.status === 'recruiting' ? '召集中' : '攻坚中'}
                </Tag>
                <span>创建者：{team.creator}</span>
                <span>副本类型：{team.dungeonType === 'weekly' ? '周本' : '试剑'}</span>
                <span>当前人数：{team.members.length}</span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
