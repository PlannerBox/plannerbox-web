import { useMutation } from '@tanstack/react-query';
import {
  DefineStudentGroupManagerProps,
  DefineStudentGroupManagerResponse,
  defineStudentGroupManager,
} from 'api-client';

type DefineStudentGroupManagerHookOptions = {
  onSuccess?: (data: DefineStudentGroupManagerResponse) => void;
  onError?: (error: unknown) => void;
};

const useDefineStudentGroupManager = ({
  onSuccess,
  onError,
}: DefineStudentGroupManagerHookOptions) => {
  return useMutation<
    DefineStudentGroupManagerResponse,
    unknown,
    DefineStudentGroupManagerProps
  >({
    mutationFn: async (data: DefineStudentGroupManagerProps) => {
      return await defineStudentGroupManager(data);
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

export { useDefineStudentGroupManager };
