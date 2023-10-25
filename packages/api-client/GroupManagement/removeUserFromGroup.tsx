import { apiCall } from '../utils/api';

export type RemoveUserFromGroupProps = {
  groupId: string;
  accountId: string;
};

export type RemoveUserFromGroupResponse = {};

const removeUserFromGroup = async ({
  groupId,
  accountId,
}: RemoveUserFromGroupProps): Promise<RemoveUserFromGroupResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/${groupId}/remove-member/${accountId}`,
    {
      method: 'DELETE',
    }
  );
};

export { removeUserFromGroup };
