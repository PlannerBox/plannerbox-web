import { useMutation } from '@tanstack/react-query';
import { CreateGroupProps, CreateGroupResponse, createGroup } from 'api-client';
import { useCookies } from 'react-cookie';

type CreateGroupHookOptions = {
  onSuccess?: (data: CreateGroupResponse) => void;
  onError?: (error: unknown) => void;
};

const useCreateGroup = ({ onSuccess, onError }: CreateGroupHookOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<
    CreateGroupResponse,
    unknown,
    Omit<CreateGroupProps, 'session'>
  >({
    mutationFn: async (data: Omit<CreateGroupProps, 'session'>) => {
      return await createGroup({ ...data, session: cookies.session });
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

export { useCreateGroup };
