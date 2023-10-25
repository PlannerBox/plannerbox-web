import { useMutation } from '@tanstack/react-query';
import { UpdateUserProps, UpdateUserResponse, updateUser } from 'api-client';
import { useCookies } from 'react-cookie';

type UpdateUserHookOptions = {
  onSuccess?: (data: UpdateUserResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateUser = ({ onSuccess, onError }: UpdateUserHookOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<
    UpdateUserResponse,
    unknown,
    Omit<UpdateUserProps, 'session'>
  >({
    mutationFn: async (data: Omit<UpdateUserProps, 'session'>) => {
      return await updateUser({ ...data, session: cookies['session'] });
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

export { useUpdateUser };
