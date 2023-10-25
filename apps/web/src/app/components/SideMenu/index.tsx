'use client';

import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(
      <Link href={'/users-management'}>Gestion des utilisateurs</Link>,
      '1',
      <UserOutlined />
    ),
    getItem(
      <Link href={'/schedules-management'}>Gestion des plannings</Link>,
      '2',
      <CalendarOutlined />
    ),
    getItem(
      <Link href={'/skills-management'}>Gestion des compétences</Link>,
      '3',
      <TrophyOutlined />
    ),
  ];

  return (
    <Sider
      collapsible
      breakpoint='lg'
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ backgroundColor: colorBgContainer }}
      width={262}
    >
      <Menu theme='light' mode='inline' items={items} />
    </Sider>
  );
}
