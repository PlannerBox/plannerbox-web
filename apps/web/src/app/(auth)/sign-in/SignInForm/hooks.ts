import { useMutation } from '@tanstack/react-query';
import { SignInProps, SignInResponse, signIn } from 'api-client';

type SignInHookOptions = {
  onSuccess?: (data: SignInResponse) => void;
  onError?: () => void;
};

const useSignIn = ({ onSuccess, onError }: SignInHookOptions) => {
  return useMutation<SignInResponse, unknown, SignInProps>({
    mutationFn: async ({ username, password }: SignInProps) => {
      return await signIn({ username, password });
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

export { useSignIn };
