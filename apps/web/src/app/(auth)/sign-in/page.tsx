import { Metadata } from 'next';
import SignInForm from './SignInForm';

export const metadata: Metadata = {
  title: 'PlannerBox - Connexion',
};

export default function SignIn() {
  return <SignInForm />;
}
