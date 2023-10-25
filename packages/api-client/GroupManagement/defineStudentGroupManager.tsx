import { apiCall } from '../utils/api';

export type DefineStudentGroupManagerProps = {
  accountId: string;
  groupId: string;
  isOwner: boolean;
};

export type DefineStudentGroupManagerResponse = {};

const defineStudentGroupManager = async ({
  accountId,
  groupId,
  isOwner,
}: DefineStudentGroupManagerProps): Promise<DefineStudentGroupManagerResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/${groupId}/update/${accountId}`,
    {
      method: 'POST',
      body: JSON.stringify({ accountId, isOwner }),
    }
  );
};

export { defineStudentGroupManager };
