import { Metadata } from 'next';
import ChangePasswordForm from './ChangePasswordForm';

export const metadata: Metadata = {
  title: 'PlannerBox - Changement de mot de passe',
};

type PageParams = { params: { token: string } };

export default function ChangePassword({ params }: PageParams) {
  return <ChangePasswordForm token={params.token} />;
}
