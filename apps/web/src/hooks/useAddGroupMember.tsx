import { useMutation } from '@tanstack/react-query';
import {
  AddGroupMemberProps,
  AddGroupMemberResponse,
  addGroupMember,
} from 'api-client';

type AddGroupMemberHookOptions = {
  onSuccess?: (data: AddGroupMemberResponse) => void;
  onError?: (error: unknown) => void;
};

const useAddGroupMember = ({
  onSuccess,
  onError,
}: AddGroupMemberHookOptions) => {
  return useMutation<AddGroupMemberResponse, unknown, AddGroupMemberProps>({
    mutationFn: async (data: AddGroupMemberProps) => {
      return await addGroupMember(data);
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

export { useAddGroupMember };
