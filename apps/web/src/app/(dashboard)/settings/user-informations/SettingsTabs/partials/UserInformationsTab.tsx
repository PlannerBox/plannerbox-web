'use client';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import { UpdateUserProps, UpdateUserResponse } from 'api-client';
import { ReactNode, useEffect } from 'react';
import { useUpdateUser } from '../../../../../../hooks/useUpdateUser';
import { useUserDetails } from '../../../../../../hooks/useUserDetails';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function UserInformationsTab() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const openNotification = ({
    title,
    description,
    icon,
  }: OpenNotificationProps) => {
    notificationApi.open({
      message: title,
      description: description,
      icon: icon,
      placement: 'top',
    });
  };

  const { data: userDetails, isLoading: isUserDetailsLoading } = useUserDetails(
    {}
  );

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: handleUpdateUserSuccess,
    onError: handleUpdateUserStateError,
  });

  function handleUpdateUserSuccess(data: UpdateUserResponse) {
    if (!!data) {
      openNotification({
        title: 'Informations personnelles mises à jour !',
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
    } else {
      openNotification({
        title:
          'Une erreur est survenue lors de la mise à jour des informations personnelles !',
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleUpdateUserStateError() {
    openNotification({
      title:
        'Une erreur est survenue lors de la mise à jour des informations personnelles !',
      icon: <CloseCircleOutlined />,
    });
  }

  const onFinish = (values: Omit<UpdateUserProps, 'session'>) => {
    updateUser({
      id: userDetails!.id,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
    });
  };

  useEffect(() => {
    console.log({ userDetails });
    if (userDetails !== undefined) {
      form.setFieldsValue({
        lastname: userDetails.lastname,
        firstname: userDetails.firstname,
        username: userDetails.username,
      });
    }
  }, [userDetails]);

  return (
    <>
      {notificationContextHolder}
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        style={{ maxWidth: '100%' }}
        labelCol={{ style: { width: 200 } }}
        wrapperCol={{ style: { width: '100%' } }}
      >
        <Form.Item name='lastname' label='Nom' rules={[{ required: true }]}>
          <Input disabled={isUserDetailsLoading} />
        </Form.Item>
        <Form.Item name='firstname' label='Prénom' rules={[{ required: true }]}>
          <Input disabled={isUserDetailsLoading} />
        </Form.Item>
        <Form.Item
          name='username'
          label='Adresse mail'
          rules={[{ required: true, type: 'email' }]}
        >
          <Input disabled={isUserDetailsLoading} />
        </Form.Item>
        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
          wrapperCol={{
            style: { margin: 'auto', marginTop: 'var(--spacing-24)' },
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            loading={isUserDetailsLoading}
          >
            Enregistrer les modifications
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
