import { useMutation } from '@tanstack/react-query';
import { logout } from 'api-client';
import { useCookies } from 'react-cookie';

type LogoutOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useLogout = ({ onSuccess, onError }: LogoutOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<{}, unknown, {}>({
    mutationFn: async () => {
      return await logout({ session: cookies['session'] });
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

export { useLogout };
