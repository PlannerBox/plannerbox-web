import { Metadata, NextPage } from 'next';
import SkillsManagementTabs from './SkillsManagementTabs';

export const metadata: Metadata = {
  title: 'PlannerBox - Gestion des compétences',
};

const SkillsManagement: NextPage = () => <SkillsManagementTabs />;

export default SkillsManagement;
