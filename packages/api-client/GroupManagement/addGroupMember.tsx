import { apiCall } from '../utils/api';

export type AddGroupMemberProps = {
  accountId: string;
  isOwner: boolean;
  groupId: string;
};

export type AddGroupMemberResponse = {};

const addGroupMember = async ({
  accountId,
  isOwner,
  groupId,
}: AddGroupMemberProps): Promise<AddGroupMemberResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/${groupId}/add`,
    {
      method: 'POST',
      body: JSON.stringify({ accountId, isOwner }),
    }
  );
};

export { addGroupMember };
