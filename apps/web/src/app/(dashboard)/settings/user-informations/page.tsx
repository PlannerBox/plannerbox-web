import { Metadata, NextPage } from 'next';
import SettingsTab from './SettingsTabs';

export const metadata: Metadata = {
  title: 'PlannerBox - Paramètres',
};

const Settings: NextPage = () => <SettingsTab />;

export default Settings;
