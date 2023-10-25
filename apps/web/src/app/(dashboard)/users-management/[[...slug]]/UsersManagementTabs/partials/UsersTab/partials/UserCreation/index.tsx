import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  notification,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ListGroupsProps, SignUpProps, SignUpResponse } from 'api-client';
import { Role } from 'api-client/enums/Role';
import { ReactNode, useEffect, useState } from 'react';
import { FormationMode } from '../../../../../../../../../enums/FormationMode';
import { useListGroups } from '../../../../../../../../../hooks/useListGroups';
import { useSignUp } from '../../../../../../../../../hooks/useSignUp';
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

export type UserCreationProps = {
  closePopover: () => void;
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const UserCreation = ({ closePopover }: UserCreationProps) => {
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

  const {
    mutate: fetchSignUp,
    isLoading,
    isSuccess,
    error,
  } = useSignUp({ onSuccess: handleSuccess, onError: handleError });

  const userAlreadyCreated = false;

  const [listGroupsOptions, setListGroupsOptions] = useState<ListGroupsProps>({
    filter: undefined,
    limit: 1000,
  });

  const queryClient = useQueryClient();

  const {
    data: groupsList,
    isLoading: isGroupsListLoading,
    refetch: refetchListGroups,
  } = useListGroups({});

  const groupOptions: Group[] | undefined = groupsList
    ? groupsList.data.map((group) => ({
        value: group.id,
        label: group.name,
      }))
    : [];

  function handleSuccess(data: SignUpResponse) {
    if (!!data) {
      openNotification({
        title: 'Utilisateur créé avec succès !',
        icon: <CheckCircleOutlined />,
      });
      closePopover();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['listUsers'] });
    } else {
      openNotification({
        title: "Une erreur est survenue lors de la création de l'utilisateur !",
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleError() {
    openNotification({
      title: "Une erreur est survenue lors de la création de l'utilisateur !",
      icon: <CloseCircleOutlined />,
    });
  }

  const onFinish = (values: SignUpProps) => {
    fetchSignUp(values);
  };

  const onRoleChange = (value: Role) => {
    if (value === Role.Admin) {
      form.setFieldsValue({ formationMode: undefined, groups: undefined });
    } else if (value === Role.InternTeacher || value === Role.ExternTeacher) {
      form.setFieldsValue({ formationMode: undefined });
    }
  };

  const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const handleGroupSearch = (value: string) => {
    setListGroupsOptions((old) => ({
      filter: {
        name: value,
      },
      limit: old.limit,
    }));
  };

  useEffect(() => {
    refetchListGroups();
  }, [listGroupsOptions]);

  return (
    <>
      {notificationContextHolder}
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        labelCol={{ style: { width: 200 } }}
        wrapperCol={{ style: { width: '100%' } }}
        className={styles.userCreation}
      >
        <Form.Item name='role' label='Type' rules={[{ required: true }]}>
          <Select
            placeholder='Sélectionner une option'
            allowClear
            onChange={onRoleChange}
          >
            <Option value={Role.Student}>Apprenant</Option>
            <Option value={Role.InternTeacher}>Formateur interne</Option>
            <Option value={Role.ExternTeacher}>Formateur externe</Option>
            <Option value={Role.Admin}>Administrateur</Option>
          </Select>
        </Form.Item>
        <Form.Item name='lastname' label='Nom' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='firstname' label='Prénom' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='username'
          label='Adresse mail'
          rules={[{ required: true, type: 'email' }]}
          help={
            userAlreadyCreated
              ? 'Adresse mail déjà utilisée par un utilisateur'
              : undefined
          }
          status={userAlreadyCreated ? 'error' : undefined}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Mot de passe'
          rules={[{ required: true, type: 'string' }]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          name='birthDate'
          label='Date de naissance'
          rules={[{ required: true, type: 'date' }]}
        >
          <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item
          name='birthPlace'
          label='Lieu de naissance'
          rules={[{ required: true, type: 'string' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.role !== currentValues.role
          }
        >
          {({ getFieldValue }) => (
            <>
              {getFieldValue('role') === Role.Student && (
                <>
                  <Form.Item
                    name='formationMode'
                    label="Méthode d'organisation"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder='Sélectionner une option' allowClear>
                      <Option value={FormationMode.Presentiel}>
                        Présentiel
                      </Option>
                      <Option value={FormationMode.Distanciel}>
                        Distanciel
                      </Option>
                      <Option value={FormationMode.Hybride}>
                        Mixte présentiel/distanciel
                      </Option>
                    </Select>
                  </Form.Item>
                </>
              )}
              {(getFieldValue('role') === Role.Student ||
                getFieldValue('role') === Role.InternTeacher ||
                getFieldValue('role') === Role.ExternTeacher) && (
                <Form.Item
                  name='groups'
                  label='Groupe(s)'
                  rules={[{ required: false }]}
                >
                  <Cascader
                    loading={isGroupsListLoading}
                    options={groupOptions}
                    placeholder='Sélectionner un ou plusieurs groupes'
                    showSearch={{ filter: filterGroups }}
                    onSearch={handleGroupSearch}
                    maxTagCount='responsive'
                    multiple
                  />
                </Form.Item>
              )}
            </>
          )}
        </Form.Item>
        <Form.Item
          name='switch'
          label='État'
          valuePropName='checked'
          help={
            'Un compte activé permet à l’utilisateur de se connecter, tandis qu’un compte désactivé bloque sa connexion.'
          }
        >
          <Switch defaultChecked />
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
          <Button type='primary' htmlType='submit'>
            Créer l&apos;utilisateur
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserCreation;
