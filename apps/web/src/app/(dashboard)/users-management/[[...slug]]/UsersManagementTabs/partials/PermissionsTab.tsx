'use client';

import { Space, Switch, Table } from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import { LiteralUnion } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';

type GroupType = {
  name: string;
  color: LiteralUnion<PresetColorType | PresetStatusColorType>;
};

interface DataType {
  key: string;
  permission: string;
  admin: boolean;
  internal_teacher: boolean;
  external_teacher: boolean;
  student: boolean;
}

const fakePermissions = [
  {
    permission: 'Modifier ses informations',
    admin: true,
    internal_teacher: true,
    external_teacher: true,
    student: true,
  },
  {
    permission: 'Ajouter des utilisateurs',
    admin: true,
    internal_teacher: true,
    external_teacher: true,
    student: false,
  },
  {
    permission: 'Désactiver des utilisateurs',
    admin: true,
    internal_teacher: true,
    external_teacher: false,
    student: false,
  },
  {
    permission: 'Modifier les permissions',
    admin: true,
    internal_teacher: false,
    external_teacher: false,
    student: false,
  },
];

const handlePermissionChange = (
  permission: string,
  role: string,
  current: boolean
) => {
  console.log(
    `permission '${permission}' for role '${role}' changed to: ${!current}}`
  );
};

const columns: ColumnsType<DataType> = [
  {
    title: 'Permission',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: 'Administateurs',
    dataIndex: 'admin',
    key: 'admin',
    render: (_, record) => (
      <Space size='middle'>
        <Switch
          defaultChecked={record.admin}
          onChange={() =>
            handlePermissionChange(record.permission, 'admin', record.admin)
          }
        />
      </Space>
    ),
  },
  {
    title: 'Formateurs internes',
    dataIndex: 'internal_teacher',
    key: 'internal_teacher',
    render: (_, record) => (
      <Space size='middle'>
        <Switch defaultChecked={record.internal_teacher} />
      </Space>
    ),
  },
  {
    title: 'Formateurs externes',
    dataIndex: 'external_teacher',
    key: 'external_teacher',
    render: (_, record) => (
      <Space size='middle'>
        <Switch defaultChecked={record.external_teacher} />
      </Space>
    ),
  },
  {
    title: 'Apprenants',
    dataIndex: 'student',
    key: 'student',
    render: (_, record) => (
      <Space size='middle'>
        <Switch defaultChecked={record.student} />
      </Space>
    ),
  },
];

const data: DataType[] = fakePermissions.map((permission, index) => ({
  key: index.toString(),
  ...permission,
}));

export default function PermissionsTab() {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 150 }}
        pagination={false}
      />
    </div>
  );
}
