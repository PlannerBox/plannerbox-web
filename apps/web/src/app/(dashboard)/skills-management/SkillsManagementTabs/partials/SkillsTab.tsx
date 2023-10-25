'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

type SkillsTabProps = {
  step?: 'list';
};

export default function SkillsTab({ step = 'list' }: SkillsTabProps) {
  interface SkillsDataType {
    key: string;
    name: string;
    internal_teachers: number;
    external_teachers: number;
  }

  type SkillFieldType = {
    name?: string;
  };

  const [creationForm] = Form.useForm<SkillFieldType>();
  const skillNameCreationValue = Form.useWatch('name', creationForm);

  const onSkillCreationFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onSkillCreationFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSkillCreationReset = () => {
    creationForm.resetFields();
  };

  const addSkillPopoverContent = () => (
    <Form
      name='basic'
      initialValues={{}}
      onFinish={onSkillCreationFinish}
      onFinishFailed={onSkillCreationFinishFailed}
      autoComplete='off'
      form={creationForm}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
      }}
    >
      <Form.Item<SkillFieldType> name='name' style={{ margin: 0 }}>
        <Input />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={(skillNameCreationValue?.length || 0) <= 0}
        >
          Créer
        </Button>
      </Form.Item>
    </Form>
  );

  const [editForm] = Form.useForm<SkillFieldType>();
  const skillNameEditValue = Form.useWatch('name', editForm);

  const onSkillEditFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onSkillEditFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSkillEditReset = () => {
    editForm.resetFields();
  };

  const editSkillPopoverContent = (defaultValue: string) => (
    <Form
      name='basic'
      initialValues={{}}
      onFinish={onSkillEditFinish}
      onFinishFailed={onSkillEditFinishFailed}
      autoComplete='off'
      form={editForm}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
      }}
    >
      <Form.Item<SkillFieldType> name='name' style={{ margin: 0 }}>
        <Input defaultValue={defaultValue} />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={(skillNameEditValue?.length || 0) <= 0}
        >
          Modifier
        </Button>
      </Form.Item>
    </Form>
  );

  const skillsColumns: ColumnsType<SkillsDataType> = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Formateurs internes',
      dataIndex: 'internal_teachers',
      key: 'internal_teachers',
    },
    {
      title: 'Formateurs externes',
      dataIndex: 'external_teachers',
      key: 'external_teachers',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Popover
            placement='leftTop'
            title='Nom de la compétence'
            content={() => editSkillPopoverContent(record.name)}
            trigger='click'
            onOpenChange={onSkillEditReset}
          >
            <EditOutlined />
          </Popover>
          <MoreOutlined />
        </Space>
      ),
    },
  ];

  const skillsData: SkillsDataType[] = [
    {
      key: '1',
      name: 'Big Data',
      internal_teachers: 0,
      external_teachers: 3,
    },
    {
      key: '2',
      name: 'Big Data',
      internal_teachers: 42,
      external_teachers: 12,
    },
    {
      key: '3',
      name: 'Big Data',
      internal_teachers: 32,
      external_teachers: 99,
    },
  ];

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
              placement='leftTop'
              title='Nom de la compétence'
              content={addSkillPopoverContent}
              trigger='click'
              onOpenChange={onSkillCreationReset}
            >
              <Button type='primary'>Créer une compétence</Button>
            </Popover>
          </div>
          <Table
            columns={skillsColumns}
            dataSource={skillsData}
            scroll={{ x: 150 }}
          />
        </>
      )}
    </div>
  );
}
