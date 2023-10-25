'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import GroupsTab from './partials/GroupsTab';
import PermissionsTab from './partials/PermissionsTab';
import UsersTab from './partials/UsersTab/partials/UsersList';

export default function UsersManagementTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const validTabs = ['users', 'groups', 'permissions'];
  const currentTabSplittedPathname = pathname.split('/');
  const currentTabPathname = currentTabSplittedPathname[2] ?? '';

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/users-management/${key}`, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    // Redirect to 'users' by default
    if (currentTabPathname === '') {
      shallowRedirect('users');
    }
  }, [shallowRedirect, currentTabPathname]);

  const currentTab = validTabs.includes(currentTabPathname)
    ? currentTabPathname
    : 'users';

  const groupStep = useCallback(() => {
    if (currentTabSplittedPathname[4] === 'manage') {
      // TODO: Check for ID validity
      return 'manage';
    }

    if (currentTabSplittedPathname[3] === 'create') {
      return 'create';
    }

    return 'list';
  }, [currentTabSplittedPathname]);

  const items: TabsProps['items'] = [
    {
      key: 'users',
      label: `Utilisateurs`,
      children: <UsersTab step='list' />,
    },
    {
      key: 'groups',
      label: `Groupes`,
      children: <GroupsTab step={groupStep()} />,
    },
    {
      key: 'permissions',
      label: `Permissions`,
      children: <PermissionsTab />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={currentTab}
      items={items}
      onChange={shallowRedirect}
    />
  );
}
