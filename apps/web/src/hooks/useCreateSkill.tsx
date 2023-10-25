import { useMutation } from '@tanstack/react-query';
import { CreateSkillProps, CreateSkillResponse, createSkill } from 'api-client';

type CreateSkillHookOptions = {
  onSuccess?: (data: CreateSkillResponse) => void;
  onError?: (error: unknown) => void;
};

const useCreateSkill = ({ onSuccess, onError }: CreateSkillHookOptions) => {
  return useMutation<CreateSkillResponse, unknown, CreateSkillProps>({
    mutationFn: async (data: CreateSkillProps) => {
      return await createSkill(data);
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

export { useCreateSkill };
