import { useMutation } from '@tanstack/react-query';
import { UpdateSkillProps, UpdateSkillResponse, updateSkill } from 'api-client';

type UpdateSkillHookOptions = {
  onSuccess?: (data: UpdateSkillResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateSkill = ({ onSuccess, onError }: UpdateSkillHookOptions) => {
  return useMutation<UpdateSkillResponse, unknown, UpdateSkillProps>({
    mutationFn: async (data: UpdateSkillProps) => {
      return await updateSkill(data);
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

export { useUpdateSkill };
