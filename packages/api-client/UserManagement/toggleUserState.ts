import { apiCall } from '../utils/api';

export type ToggleUserStateProps = {
  username: string;
  session: string;
};

export type ToggleUserStateResponse = {};

const toggleUserState = async ({
  username,
  session,
}: ToggleUserStateProps): Promise<ToggleUserStateResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/account-state`,
    {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: new Headers({
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
    }
  );
};

export { toggleUserState };
