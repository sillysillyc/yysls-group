import { useAppStore } from '@/stores';
import { Button, Form, Input, Table, Tag, notification } from 'antd';
import { useState } from 'react';

const roleMaps = {
  chairman: 'chairman',
  'vice-chairman': 'vice-chairman',
  member: 'member',
} as const;

const titleMaps = {
  chairman: '社长',
  'vice-chairman': '副社长',
  member: '社众',
} as const;

type GuildType = {
  id: string;
  name: string;
  slogan?: string;
  chairmanTitle: string;
  members: {
    id: string;
    name: string;
    role: 'chairman' | 'vice-chairman' | 'member';
    title: '社长' | '副社长' | '社众';
  }[];
};

export default function GuildPage() {
  const [form] = Form.useForm();
  const [guilds, setGuilds] = useState<GuildType[]>([]);
  const { username } = useAppStore();

  const onFinish = (values: { name: string; slogan?: string }) => {
    const newGuild = {
      id: Math.random().toString(36).slice(2, 11),
      name: values.name,
      slogan: values.slogan,
      chairmanTitle: titleMaps.chairman,
      members: [
        {
          id: username || '',
          name: username || '',
          role: roleMaps.chairman,
          title: titleMaps.chairman,
        },
      ],
    };
    setGuilds([...guilds, newGuild]);
    notification.success({ message: '百业创建成功' });
    form.resetFields();
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '宣言',
      dataIndex: 'slogan',
      key: 'slogan',
    },
    {
      title: '成员',
      render: (record: GuildType) => (
        <div>
          <Tag color="gold">{record.chairmanTitle}（1人）</Tag>
          <Tag color="blue">副社长（{record.members.filter((m) => m.role === 'vice-chairman').length}人）</Tag>
          <Tag color="green">社众（{record.members.filter((m) => m.role === 'member').length}人）</Tag>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 600, marginBottom: 24 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="百业名称" name="name" rules={[{ required: true, message: '请输入百业名称' }]}>
            <Input placeholder="请输入百业名称" />
          </Form.Item>

          <Form.Item label="百业宣言" name="slogan">
            <Input.TextArea placeholder="请输入宣言（可选）" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建百业
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table dataSource={guilds} columns={columns} rowKey="id" bordered />
    </div>
  );
}
