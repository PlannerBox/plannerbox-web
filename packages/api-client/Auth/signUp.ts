import { Role } from '../enums/Role';
import { apiCall } from '../utils/api';

export type SignUpProps = {
  firstname: string;
  lastname: string;
  password: string;
  birthDate: Date;
  birthPlace: string;
  role: Role;
  formationMode: string;
};

export type SignUpResponse = {};

const signUp = async ({
  ...userData
}: SignUpProps): Promise<SignUpResponse> => {
  return await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ ...userData }),
  });
};

export { signUp };
