'use client';

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dropdown,
  MenuProps,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  notification,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  DeleteUserResponse,
  ListUsersProps,
  ToggleUserStateResponse,
  UserGroupData,
} from 'api-client';
import { Role } from 'api-client/enums/Role';
import { ReactNode, useEffect, useState } from 'react';
import { useDeleteUser } from '../../../../../../../../hooks/useDeleteUser';
import { useListUsers } from '../../../../../../../../hooks/useListUsers';
import { useToggleUserState } from '../../../../../../../../hooks/useToggleUserState';
import UserCreation from './UserCreation';

type UsersTabProps = {
  step?: 'list';
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function UsersTab({ step = 'list' }: UsersTabProps) {
  const queryClient = useQueryClient();

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

  const [listUsersOptions, setListUsersOptions] = useState<ListUsersProps>({
    filter: undefined,
    limit: 9,
    page: 1,
  });

  const { data: usersList } = useListUsers(listUsersOptions);
  const data: DataType[] = usersList
    ? usersList.data.map((user) => ({
        key: user.id,
        username: user.username,
        lastname: user.lastname,
        firstname: user.firstname,
        mail: user.username,
        groups: user.groups,
        active: user.active,
      }))
    : [];

  const getUserId = (username: string) => {
    if (usersList !== undefined) {
      return usersList.data.find((u) => u.username === username)?.id || '';
    }
    return '';
  };

  const { mutate: toggleState } = useToggleUserState({
    onSuccess: handleToggleStateSuccess,
    onError: handleToggleStateError,
  });

  function handleToggleStateSuccess(data: ToggleUserStateResponse) {
    if (!!data) {
      openNotification({
        title: "Etat de l'utilisateur mis à jour avec succès !",
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['listUsers'] });
    } else {
      openNotification({
        title:
          "Une erreur est survenue lors de la mise à jour de l'état de l'utilisateur !",
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleToggleStateError() {
    openNotification({
      title:
        "Une erreur est survenue lors de la mise à jour de l'état de l'utilisateur !",
      icon: <CloseCircleOutlined />,
    });
  }

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: handleDeleteUserSuccess,
    onError: handleDeleteUserError,
  });

  function handleDeleteUserSuccess(data: DeleteUserResponse) {
    if (!!data) {
      openNotification({
        title: 'Utilisateur supprimé !',
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['listUsers'] });
    } else {
      openNotification({
        title:
          "Une erreur est survenue lors de la suppression de l'utilisateur !",
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleDeleteUserError() {
    openNotification({
      title:
        "Une erreur est survenue lors de la suppression de l'utilisateur !",
      icon: <CloseCircleOutlined />,
    });
  }

  const getMoreOptions: (
    username: string,
    active: boolean
  ) => MenuProps['items'] = (username: string, active: boolean) => {
    if (active) {
      return [
        {
          key: '1',
          label: (
            <a onClick={() => toggleState({ username })}>
              Désactiver le compte
            </a>
          ),
        },
      ];
    }

    return [
      {
        key: '1',
        label: (
          <a onClick={() => toggleState({ username })}>Réactiver le compte</a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={() => deleteUser({ id: getUserId(username) })}>
            Supprimer définitivement le compte
          </a>
        ),
      },
    ];
  };

  interface DataType {
    key: string;
    username: string;
    lastname: string;
    firstname: string;
    mail: string;
    groups: UserGroupData[];
    active: boolean;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nom',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Prénom',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Adresse mail',
      dataIndex: 'mail',
      key: 'mail',
      responsive: ['md'],
    },
    {
      title: 'Groupe(s)',
      key: 'groups',
      dataIndex: 'groups',
      responsive: ['md'],
      render: (_, { groups }) => (
        <>
          {groups.map((group) => {
            return (
              <Tag color={group.color} key={group.groupId}>
                {group.groupName.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <EditOutlined />
          <Dropdown
            menu={{ items: getMoreOptions(record.username, record.active) }}
            placement='bottomRight'
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
          >
            <Button type='text'>
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const filterByRoleData = [
    {
      value: Role.Any,
      label: "Tous les types d'utilisateurs",
    },
    {
      value: Role.Admin,
      label: 'Administrateurs',
    },
    {
      value: Role.InternTeacher,
      label: 'Formateurs internes',
    },
    {
      value: Role.ExternTeacher,
      label: 'Formateurs externes',
    },
    {
      value: Role.Student,
      label: 'Apprenants',
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: !!window ? window.innerWidth : 0,
    height: !!window ? window.innerHeight : 0,
  });

  const handleResize = () => {
    setDimensions({
      width: !!window ? window.innerWidth : 0,
      height: !!window ? window.innerHeight : 0,
    });
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleOpenFormChange = (newOpen: boolean) => {
    setOpenForm(newOpen);
  };

  const handleFilterByRole = (value: Role) => {
    setListUsersOptions((old) => ({
      limit: old.limit,
      page: 1,
      filter: {
        role: value,
      },
    }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  return (
    <div>
      {step === 'list' && (
        <>
          {notificationContextHolder}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Select
              defaultValue={Role.Any}
              bordered={false}
              options={filterByRoleData}
              onChange={handleFilterByRole}
            />
            <Popover
              placement={dimensions.width >= 650 ? 'leftTop' : 'bottomRight'}
              title='Créer un utilisateur'
              content={<UserCreation closePopover={() => closeForm()} />}
              trigger='click'
              open={openForm}
              onOpenChange={handleOpenFormChange}
            >
              <Button type='primary'>Créer un utilisateur</Button>
            </Popover>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 150 }}
            pagination={{
              total: usersList?.meta.totalItems,
              pageSize: listUsersOptions.limit,
              onChange: (page, pageSize) => {
                setListUsersOptions((old) => ({
                  filter: old.filter,
                  limit: pageSize,
                  page: page,
                }));
              },
            }}
          />
        </>
      )}
    </div>
  );
}
