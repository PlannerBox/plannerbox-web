import { useMutation } from '@tanstack/react-query';
import {
  ChangePasswordProps,
  ChangePasswordResponse,
  changePassword,
} from 'api-client';

type ResetPasswordHookOptions = {
  token: string;
  password: string;
  onSuccess?: (data: ChangePasswordResponse) => void;
  onError?: () => void;
};

const useChangePassword = ({
  onSuccess,
  onError,
}: ResetPasswordHookOptions) => {
  return useMutation<ChangePasswordResponse, unknown, ChangePasswordProps>({
    mutationFn: async ({ token, password }: ChangePasswordProps) => {
      return await changePassword({ token, password });
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: () => {
      if (onError) {
        onError();
      }
    },
  });
};

export { useChangePassword };
