import { Metadata } from 'next';
import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'PlannerBox - Mot de passe oublié',
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
