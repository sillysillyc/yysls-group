import { memo, useCallback } from 'react';

import { Button, Form, Input, message, Radio } from 'antd';

import { fetchRegister, type IFetchRegisterParams } from '@/helpers/services';
import { useHandleError } from '@/hooks';
import { randomBase64Encode } from '@/helpers';
import { useAppStore } from '@/stores';
import { loginTabKeys } from '@/stores/slices';

import './index.less';

type FormValues = IFetchRegisterParams;

const { useForm, Item: FormItem } = Form;

export const RegisterForm = memo(() => {
  const [form] = useForm<FormValues>();
  const handleError = useHandleError();
  const { setLoginTabKey } = useAppStore();

  const onFinish = useCallback(
    async (values: FormValues) => {
      try {
        await fetchRegister({
          ...values,
          password: randomBase64Encode(encodeURIComponent(values.password)),
        });
        message.success('注册成功');
        form.resetFields();
        setLoginTabKey({ key: loginTabKeys.login });
      } catch (error) {
        handleError(error);
      }
    },
    [fetchRegister, handleError, setLoginTabKey]
  );

  return (
    <Form className="login-form" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <FormItem label="账号" name="name" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" />
      </FormItem>
      <FormItem label="密码" name="password" rules={[{ required: true }]}>
        <Input placeholder="请输入任意字符" type="pasword" />
      </FormItem>
      <FormItem label="性别" name="gender">
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
