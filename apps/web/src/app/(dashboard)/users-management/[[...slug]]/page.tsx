import { Metadata, NextPage } from 'next';
import UsersManagementTabs from './UsersManagementTabs';

export const metadata: Metadata = {
  title: 'PlannerBox - Gestion des utilisateurs',
};

const UsersManagement: NextPage = () => <UsersManagementTabs />;

export default UsersManagement;
