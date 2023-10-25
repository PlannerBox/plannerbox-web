'use client';

import {
  Button,
  Form,
  Input,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import UsersList from '../../../../../../components/UsersList';
import { UserElementProps } from '../../../../../../components/UsersList/partials/UserElement';
import GroupCreation from './GroupCreation';

type UsersTabProps = {
  step?: 'list' | 'manage';
};

interface GroupDataType {
  key: string;
  uuid: string;
  name: string;
  responsible: string;
  members_count: number;
}

const fakeGroups = [
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsbn',
    name: 'MS2D-AL',
    responsible: 'Roberto Alberto',
    members_count: 43,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjq',
    name: 'MS2D-JQ',
    responsible: 'Roberto Alberto',
    members_count: 12,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjp',
    name: 'Bac+5',
    responsible: 'Roberto Alberto',
    members_count: 83,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjr',
    name: '2023',
    responsible: 'Roberto Alberto',
    members_count: 50,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsja',
    name: '2022',
    responsible: 'Roberto Alberto',
    members_count: 22,
  },
];

const groupColumns: ColumnsType<GroupDataType> = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Référent',
    dataIndex: 'responsible',
    key: 'responsible',
  },
  {
    title: 'Nombre de membres',
    dataIndex: 'members_count',
    key: 'members_count',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button
          type='link'
          href={`/users-management/groups/${record.key}/manage`}
        >
          Gérer les membres
        </Button>
      </Space>
    ),
  },
];

const groupData: GroupDataType[] = fakeGroups.map((group) => ({
  key: group.uuid,
  ...group,
}));

interface Group {
  value: string;
  label: string;
  disabled?: boolean;
}

const fakeGroupOptions: Group[] = [
  {
    value: 'MS2D-AL',
    label: 'MS2D-AL',
  },
  {
    value: 'Bac+5',
    label: 'Bac+5',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: 'BGs',
    label: 'BGs',
  },
];

interface MembersDataType {
  key: string;
  lastname: string;
  firstname: string;
  mail: string;
  responsible: boolean;
}

const fakeGroupMembers: Omit<MembersDataType, 'key'>[] = [
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: true,
  },
  {
    firstname: 'Johnny',
    lastname: 'Sino',
    mail: 'johnny@sino.com',
    responsible: false,
  },
  {
    firstname: 'Porel',
    lastname: 'Rtus',
    mail: 'robert@albert.com',
    responsible: false,
  },
  {
    firstname: 'Franscesca',
    lastname: 'Gragjda',
    mail: 'franscesca@gragjda.com',
    responsible: false,
  },
  {
    firstname: 'Poiro',
    lastname: 'Trotro',
    mail: 'trotro@poiro.com',
    responsible: false,
  },
  {
    firstname: 'Ariette',
    lastname: 'Salvette',
    mail: 'ariette@salvette.com',
    responsible: false,
  },
  {
    firstname: 'Paul',
    lastname: 'Krush',
    mail: 'paul@krush.com',
    responsible: false,
  },
];

const membersColumns: ColumnsType<MembersDataType> = [
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
    render: (_, { mail, responsible }) => (
      <>
        {mail}
        {responsible === true && (
          <>
            <Tag color='blue' style={{ marginLeft: 'var(--spacing-12)' }}>
              Responsable
            </Tag>
          </>
        )}
      </>
    ),
  },
];

const membersData: MembersDataType[] = fakeGroupMembers
  .sort((value) => (value.responsible ? -1 : 1))
  .map((member, index) => ({
    key: index.toString(),
    ...member,
  }));

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function GroupsTab({ step = 'list' }: UsersTabProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/users-management/groups/${key}`, { shallow: true });
    },
    [router]
  );

  const { Text } = Typography;

  const addMemberPopoverContent = () => {
    const [users, setUsers] = useState<UserElementProps[]>([]);
    const fakeUsers: UserElementProps[] = [
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Francis',
        lastname: 'Tortel',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Johnny',
        lastname: 'Sino',
        email: 'johnny@sino.com',
      },
      {
        firstname: 'Porel',
        lastname: 'Rtus',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Franscesca',
        lastname: 'Gragjda',
        email: 'franscesca@gragjda.com',
      },
      {
        firstname: 'Poiro',
        lastname: 'Trotro',
        email: 'trotro@poiro.com',
      },
      {
        firstname: 'Ariette',
        lastname: 'Salvette',
        email: 'ariette@salvette.com',
      },
      {
        firstname: 'Paul',
        lastname: 'Krush',
        email: 'paul@krush.com',
      },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-12)',
        }}
      >
        <Input
          placeholder='Rechercher un utilisateur'
          onChange={(input) =>
            input.currentTarget.value.length > 0
              ? setUsers(fakeUsers)
              : setUsers([])
          }
        />
        <UsersList users={users} />
      </div>
    );
  };

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

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  return (
    <div>
      {step === 'list' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Popover
              placement={dimensions.width >= 650 ? 'leftTop' : 'bottomRight'}
              title='Créer un groupe'
              content={<GroupCreation closePopover={() => closeForm()} />}
              trigger='click'
              open={openForm}
              onOpenChange={handleOpenFormChange}
            >
              <Button type='primary'>Créer un groupe</Button>
            </Popover>
          </div>
          <Table
            columns={groupColumns}
            dataSource={groupData}
            scroll={{ x: 150 }}
          />
        </>
      )}
      {step === 'manage' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Text strong>Membres du groupe</Text>
            <Popover
              placement='leftTop'
              title='Sélectionner le membre'
              content={addMemberPopoverContent}
              trigger='click'
            >
              <Button type='primary'>Ajouter un membre</Button>
            </Popover>
          </div>
          <Table
            columns={membersColumns}
            dataSource={membersData}
            scroll={{ x: 150 }}
          />
        </>
      )}
    </div>
  );
}
