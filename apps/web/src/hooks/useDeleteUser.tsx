import { useMutation } from '@tanstack/react-query';
import { DeleteUserProps, DeleteUserResponse, deleteUser } from 'api-client';

type DeleteUserHookOptions = {
  onSuccess?: (data: DeleteUserResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteUser = ({ onSuccess, onError }: DeleteUserHookOptions) => {
  return useMutation<DeleteUserResponse, unknown, DeleteUserProps>({
    mutationFn: async (data: DeleteUserProps) => {
      return await deleteUser(data);
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

export { useDeleteUser };
