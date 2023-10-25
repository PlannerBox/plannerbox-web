import { apiCall } from '../utils/api';

export type CreateGroupProps = {
  name: string;
  color: string;
  session: string;
};

export type CreateGroupResponse = {};

const createGroup = async ({
  name,
  color,
  session,
}: CreateGroupProps): Promise<CreateGroupResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/create`,
    {
      method: 'POST',
      body: JSON.stringify({ name, color }),
      headers: new Headers({
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
      redirect: 'follow',
    }
  );
};

export { createGroup };
