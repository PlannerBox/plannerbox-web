import { apiCall } from '../utils/api';

export type DeleteUserProps = {
  id: string;
};

export type DeleteUserResponse = {};

const deleteUser = async ({
  id,
}: DeleteUserProps): Promise<DeleteUserResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/delete?id=${id}`,
    {
      method: 'DELETE',
    }
  );
};

export { deleteUser };
