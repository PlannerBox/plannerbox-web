import { apiCall } from '../utils/api';

export type ChangePasswordProps = {
  token: string;
  password: string;
};

export type ChangePasswordResponse = {
  access_token: string;
  refresh_token: string;
};

const changePassword = async ({
  token,
  password,
}: ChangePasswordProps): Promise<ChangePasswordResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password/${token}`,
    {
      method: 'POST',
      body: JSON.stringify({
        password: password,
      }),
    }
  );
};

export { changePassword };
