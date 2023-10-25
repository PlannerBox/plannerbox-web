import { addQueryParams, apiCall } from '../utils/api';

export type ResetPasswordProps = {
  email: string;
};

export type ResetPasswordResponse = {
  access_token: string;
  refresh_token: string;
};

const resetPassword = async ({
  email,
}: ResetPasswordProps): Promise<ResetPasswordResponse> => {
  return await apiCall(
    addQueryParams(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      'mail',
      email
    ),
    {
      method: 'POST',
    }
  );
};

export { resetPassword };
