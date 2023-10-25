import { useMutation } from '@tanstack/react-query';
import {
  UpdateRolePermissionsProps,
  UpdateRolePermissionsResponse,
  updateRolePermissions,
} from 'api-client';

type UpdateRolePermissionsHookOptions = {
  onSuccess?: (data: UpdateRolePermissionsResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateRolePermissions = ({
  onSuccess,
  onError,
}: UpdateRolePermissionsHookOptions) => {
  return useMutation<
    UpdateRolePermissionsResponse,
    unknown,
    UpdateRolePermissionsProps
  >({
    mutationFn: async (data: UpdateRolePermissionsProps) => {
      return await updateRolePermissions(data);
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

export { useUpdateRolePermissions };
