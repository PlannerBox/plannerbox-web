import { apiCall } from '../utils/api';

export type LogoutProps = {
  session: string;
};

const logout = async ({ session }: LogoutProps) => {
  return await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { logout };
