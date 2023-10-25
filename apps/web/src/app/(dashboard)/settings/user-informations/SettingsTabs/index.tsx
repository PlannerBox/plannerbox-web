'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname } from 'next/navigation';
import UserInformationsTab from './partials/UserInformationsTab';

export default function SettingsTab() {
  const pathname = usePathname();

  const validTabs = ['user-informations'];
  const currentTabSplittedPathname = pathname.split('/');
  const currentTabPathname = currentTabSplittedPathname[2] ?? '';

  const currentTab = validTabs.includes(currentTabPathname)
    ? currentTabPathname
    : 'user-informations';

  const items: TabsProps['items'] = [
    {
      key: 'user-informations',
      label: `Informations personnelles`,
      children: <UserInformationsTab />,
    },
  ];

  return <Tabs defaultActiveKey={currentTab} items={items} />;
}
