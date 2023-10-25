import { useMutation } from '@tanstack/react-query';
import { SignUpProps, SignUpResponse, signUp } from 'api-client';

type SignUpHookOptions = {
  onSuccess?: (data: SignUpResponse) => void;
  onError?: (error: unknown) => void;
};

const useSignUp = ({ onSuccess, onError }: SignUpHookOptions) => {
  return useMutation<SignUpResponse, unknown, SignUpProps>({
    mutationFn: async (data: SignUpProps) => {
      return await signUp({ ...data });
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

export { useSignUp };
