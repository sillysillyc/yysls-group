import { memo, useCallback } from 'react';

import { Button, Form, Input, Radio } from 'antd';

import { fetchRegister, type IFetchRegisterParams } from '@/helpers/services';
import { useHandleError } from '@/hooks';

import './index.less';

type FormValues = IFetchRegisterParams;

const { useForm, Item: FormItem } = Form;

export const RegisterForm = memo(() => {
  const [form] = useForm<FormValues>();
  const handleError = useHandleError();

  const onFinish = useCallback(
    async (values: FormValues) => {
      try {
        const result = await fetchRegister(values);
        console.log(result);
      } catch (error) {
        handleError(error);
      }
    },
    [fetchRegister, handleError]
  );

  return (
    <Form className="login-form" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <FormItem label="账号" name="name" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" />
      </FormItem>
      <FormItem label="密码" name="password" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" />
      </FormItem>
      <FormItem label="性别" name="gender" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </FormItem>
    </Form>
  );
});
