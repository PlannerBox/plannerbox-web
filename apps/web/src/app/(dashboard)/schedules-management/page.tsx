import { Metadata, NextPage } from 'next';
import SchedulesManagementTabs from './SchedulesManagementTabs';

export const metadata: Metadata = {
  title: 'PlannerBox - Gestion des plannings',
};

const SchedulesManagement: NextPage = () => <SchedulesManagementTabs />;

export default SchedulesManagement;
