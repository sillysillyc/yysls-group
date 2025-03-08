import { memo, useCallback } from 'react';

import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { fetchLogin, IFetchLoginParams } from '@/helpers/services';
import { useHandleError } from '@/hooks';
import { handleStorage, randomBase64Encode } from '@/helpers';
import { localStorageKeysMap } from '@/helpers/constants';
import { useAppStore } from '@/stores';

import './index.less';

type FormValues = IFetchLoginParams;

const { useForm, Item: FormItem } = Form;

export const LoginForm = memo(() => {
  const [form] = useForm<FormValues>();
  const handleError = useHandleError();
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();

  const onFinish = useCallback(
    async (values: FormValues) => {
      try {
        const { data } = await fetchLogin({
          name: values.name,
          password: randomBase64Encode(encodeURIComponent(values.password)),
        });
        setUserInfo({ userInfo: data.accountInfo });
        handleStorage.local.set(localStorageKeysMap.token, data.token);
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
        <Input placeholder="请输入任意字符" type="password" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </FormItem>
    </Form>
  );
});
