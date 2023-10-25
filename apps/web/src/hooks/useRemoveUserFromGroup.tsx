import { useMutation } from '@tanstack/react-query';
import {
  RemoveUserFromGroupProps,
  RemoveUserFromGroupResponse,
  removeUserFromGroup,
} from 'api-client';

type RemoveUserFromGroupHookOptions = {
  onSuccess?: (data: RemoveUserFromGroupResponse) => void;
  onError?: (error: unknown) => void;
};

const useRemoveUserFromGroup = ({
  onSuccess,
  onError,
}: RemoveUserFromGroupHookOptions) => {
  return useMutation<
    RemoveUserFromGroupResponse,
    unknown,
    RemoveUserFromGroupProps
  >({
    mutationFn: async (data: RemoveUserFromGroupProps) => {
      return await removeUserFromGroup(data);
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

export { useRemoveUserFromGroup };
