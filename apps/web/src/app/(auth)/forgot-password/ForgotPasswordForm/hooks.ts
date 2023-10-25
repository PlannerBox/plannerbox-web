import { useMutation } from '@tanstack/react-query';
import {
  ResetPasswordProps,
  ResetPasswordResponse,
  resetPassword,
} from 'api-client';

type ResetPasswordHookOptions = {
  onSuccess?: (data: ResetPasswordResponse) => void;
  onError?: () => void;
};

const useResetPassword = ({ onSuccess, onError }: ResetPasswordHookOptions) => {
  return useMutation<ResetPasswordResponse, unknown, ResetPasswordProps>({
    mutationFn: async ({ email }: ResetPasswordProps) => {
      return await resetPassword({ email });
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

export { useResetPassword };
