import { memo, useCallback } from 'react';

import { Button, Form, Input } from 'antd';

import { fetchLogin, IFetchLoginParams } from '@/helpers/services';
import { useHandleError } from '@/hooks';

import './index.less';
import { useNavigate } from 'react-router-dom';

type FormValues = IFetchLoginParams;

const { useForm, Item: FormItem } = Form;

export const LoginForm = memo(() => {
  const [form] = useForm<FormValues>();
  const handleError = useHandleError();
  const navigate = useNavigate();

  const onFinish = useCallback(
    async (values: FormValues) => {
      try {
        const { data } = await fetchLogin(values);
        localStorage.setItem('token', data.token);
        navigate('/hubs/team');
      } catch (error) {
        handleError(error);
      }
    },
    [fetchLogin, handleError]
  );

  return (
    <Form className="login-form" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <FormItem label="账号" name="name" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" />
      </FormItem>
      <FormItem label="密码" name="password" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </FormItem>
    </Form>
  );
});
