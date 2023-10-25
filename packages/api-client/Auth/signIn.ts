import { apiCall } from '../utils/api';

export type SignInProps = {
  username: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

const signIn = async ({
  username,
  password,
}: SignInProps): Promise<SignInResponse> => {
  return await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
  });
};

export { signIn };
