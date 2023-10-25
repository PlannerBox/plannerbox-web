import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Select, notification } from 'antd';
import { CreateGroupProps, SignUpResponse } from 'api-client';
import { ReactNode } from 'react';
import { useCreateGroup } from '../../../../../../../../hooks/useCreateGroup';
import styles from './styles.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Group {
  value: string;
  label: string;
  disabled?: boolean;
}

export type GroupCreationProps = {
  closePopover: () => void;
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const GroupCreation = ({ closePopover }: GroupCreationProps) => {
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

  const { mutate: createGroup } = useCreateGroup({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const queryClient = useQueryClient();

  function handleSuccess(data: SignUpResponse) {
    if (!!data) {
      openNotification({
        title: 'Groupe créé avec succès !',
        icon: <CheckCircleOutlined />,
      });
      closePopover();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['listGroups'] });
    } else {
      openNotification({
        title: 'Une erreur est survenue lors de la création du groupe !',
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleError() {
    openNotification({
      title: 'Une erreur est survenue lors de la création du groupe !',
      icon: <CloseCircleOutlined />,
    });
  }

  const onFinish = (values: Omit<CreateGroupProps, 'color' | 'session'>) => {
    const randomColorList = [
      'red',
      'magenta',
      'red',
      'volcano',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'geekblue',
      'purple',
    ];
    const randomIndex = Math.floor(Math.random() * randomColorList.length);
    const randomColor = randomColorList[randomIndex];
    const newGroup = { color: randomColor, name: values.name };
    createGroup(newGroup);
  };

  return (
    <>
      {notificationContextHolder}
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        labelCol={{ style: { width: 80 } }}
        wrapperCol={{ style: { width: '100%' } }}
        className={styles.GroupCreation}
      >
        <Form.Item name='name' label='Nom' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
          wrapperCol={{
            style: { margin: 'auto', marginTop: 'var(--spacing-4)' },
          }}
        >
          <Button type='primary' htmlType='submit'>
            Créer le groupe
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default GroupCreation;
