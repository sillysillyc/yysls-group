import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';

type FieldType = {
  username: string;
};

export default function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    useUserStore.getState().login(values.username);
    notification.success({ message: '登录成功' });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名称"
          name="username"
          rules={[{ required: true, message: '请输入您的名称' }]}
        >
          <Input placeholder="请输入任意字符" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            进入系统
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}