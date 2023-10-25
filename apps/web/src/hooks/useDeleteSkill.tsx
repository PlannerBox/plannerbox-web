import { useMutation } from '@tanstack/react-query';
import { DeleteSkillResponse, deleteSkill } from 'api-client';

type DeleteSkillHookOptions = {
  onSuccess?: (data: DeleteSkillResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteSkill = ({ onSuccess, onError }: DeleteSkillHookOptions) => {
  return useMutation<DeleteSkillResponse, unknown, string>({
    mutationFn: async (skillId: string) => {
      return await deleteSkill({ skillId });
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

export { useDeleteSkill };
