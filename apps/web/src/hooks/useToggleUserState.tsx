import { useMutation } from '@tanstack/react-query';
import {
  ToggleUserStateProps,
  ToggleUserStateResponse,
  toggleUserState,
} from 'api-client';
import { useCookies } from 'react-cookie';

type ToggleUserStateHookOptions = {
  onSuccess?: (data: ToggleUserStateResponse) => void;
  onError?: (error: unknown) => void;
};

const useToggleUserState = ({
  onSuccess,
  onError,
}: ToggleUserStateHookOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<
    ToggleUserStateResponse,
    unknown,
    Omit<ToggleUserStateProps, 'session'>
  >({
    mutationFn: async (data: Omit<ToggleUserStateProps, 'session'>) => {
      return await toggleUserState({ ...data, session: cookies['session'] });
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

export { useToggleUserState };
