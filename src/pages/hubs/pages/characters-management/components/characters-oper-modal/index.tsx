import { memo, useCallback, useEffect, useMemo } from 'react';

import { Form, Input, InputNumber, message, Modal, Radio, Select, type ModalProps } from 'antd';
import { useAppStore } from '@/stores';
import { fetchCreateCharacter, fetchUpdateCharacter, IFetchCreateCharacterParams } from '@/helpers/services';
import { charaterClassNameMap, genderMap, messages } from '@/helpers/constants';
import { useHandleError } from '@/hooks';

interface ICharactersOperModalProps extends ModalProps {}

const { useForm, Item: FormItem } = Form;

type FormValues = Omit<IFetchCreateCharacterParams, 'characterId'>;

export const CharactersOperModal = memo((props: ICharactersOperModalProps) => {
  const [form] = useForm<FormValues>();
  const handleError = useHandleError();
  const {
    charactersOperModalOpen,
    charactersOperInfo,
    setCharactersOperInfo,
    setCharactersOperModalOpen,
    queryCharactersList,
  } = useAppStore();

  const isCreateMode = useMemo(() => !charactersOperInfo, [charactersOperInfo]);
  const characterRoleOptions = useMemo(
    () =>
      Object.entries(charaterClassNameMap).map(([key, label]) => ({
        key,
        label,
        value: key,
      })),
    []
  );

  const onModalOk = useCallback(async () => {
    try {
      const formValues = await form.validateFields();
      if (isCreateMode) {
        await fetchCreateCharacter(formValues);
      } else {
        await fetchUpdateCharacter({
          characterId: charactersOperInfo?.characterId!,
          ...formValues,
        });
      }
      const { create, update } = messages.characters;
      message.success(isCreateMode ? create.success : update.success);
      setCharactersOperModalOpen({ open: false });
      queryCharactersList();
    } catch (error) {
      handleError(error);
    }
  }, [isCreateMode, charactersOperInfo, form, queryCharactersList, setCharactersOperModalOpen]);

  useEffect(() => {
    if (charactersOperModalOpen) {
      if (charactersOperInfo) {
        form.setFieldsValue(charactersOperInfo);
      } else {
        form.setFieldsValue({
          characterAttainments: 1,
          characterLevel: 1,
        });
      }
    }
  }, [charactersOperModalOpen, charactersOperInfo]);

  return (
    <Modal
      centered
      afterClose={() => {
        setCharactersOperInfo(null);
        form.resetFields();
      }}
      title={isCreateMode ? '创建角色' : '编辑角色'}
      open={charactersOperModalOpen}
      onOk={onModalOk}
      onCancel={() => setCharactersOperModalOpen({ open: false })}
      {...props}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <FormItem<FormValues> label="角色名称" name="characterName" required rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem<FormValues> label="角色职业" name="characterRole">
          <Select options={characterRoleOptions} />
        </FormItem>
        <FormItem<FormValues> label="角色等级" name="characterLevel">
          <InputNumber style={{ width: '100%' }} max={120} min={0} />
        </FormItem>
        <FormItem<FormValues> label="角色造诣" name="characterAttainments">
          <InputNumber style={{ width: '100%' }} min={0} max={99999} />
        </FormItem>
        <FormItem<FormValues> label="角色性别" name="characterGender">
          <Radio.Group>
            <Radio value={genderMap.male}>男</Radio>
            <Radio value={genderMap.female}>女</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
});
