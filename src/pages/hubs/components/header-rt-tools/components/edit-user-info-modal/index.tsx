import { memo, useCallback, useState } from 'react';

import { Button, Form, Input, Modal, Radio, type ModalProps } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';

import { genderMap } from '@/helpers/constants';
import { useAppStore } from '@/stores';
import { fetchEditUserInfo, IFetchEditUserInfoParams } from '@/helpers/services';
import { useHandleError } from '@/hooks';

interface IEditUserInfoModalProps extends ModalProps {}

type FormValues = IFetchEditUserInfoParams;

const { useForm, Item: FormItem } = Form;

export const EditUserInfoModal = memo((props: IEditUserInfoModalProps) => {
  const { ...restProps } = props;
  const [form] = useForm<FormValues>();
  const { editUserInfoModalOpen, setEditUserInfoModalOpen } = useAppStore();
  const handleError = useHandleError();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = useCallback(
    async (values: FormValues) => {
      console.log(values);
      if (Object.keys(values).length === 0) {
        setEditUserInfoModalOpen({ open: false });
        return;
      }

      try {
        setIsLoading(true);
        await fetchEditUserInfo({ ...values });
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, setEditUserInfoModalOpen]
  );

  return (
    <Modal
      afterClose={form.resetFields}
      title="修改账户信息"
      open={editUserInfoModalOpen}
      maskClosable={false}
      onCancel={() => !isLoading && setEditUserInfoModalOpen({ open: false })}
      footer={null}
      {...restProps}
    >
      <Form<FormValues>
        onFinish={onFinish}
        form={form}
        labelCol={{
          span: 4,
        }}
      >
        <FormItem<FormValues> label="新用户名" name="newName">
          <Input />
        </FormItem>
        <FormItem<FormValues> label="旧密码" name="oldPassword">
          <Input type="password" />
        </FormItem>
        <FormItem<FormValues> label="新密码" name="newPassword">
          <Input type="password" />
        </FormItem>
        <FormItem<FormValues> label="性别" name="gender">
          <Radio.Group>
            <Radio value={genderMap.male}>
              <ManOutlined />
            </Radio>
            <Radio value={genderMap.female}>
              <WomanOutlined />
            </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem<FormValues> style={{ textAlign: 'right' }}>
          <Button loading={isLoading}>取消</Button>
          <Button loading={isLoading} style={{ marginLeft: '8px' }} type="primary" htmlType="submit">
            确定
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
});
