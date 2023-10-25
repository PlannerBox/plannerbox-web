import { useMutation } from '@tanstack/react-query';
import {
  DissociateTeacherSkillProps,
  DissociateTeacherSkillResponse,
  dissociateTeacherSkill,
} from 'api-client';

type DissociateTeacherSkillHookOptions = {
  onSuccess?: (data: DissociateTeacherSkillResponse) => void;
  onError?: (error: unknown) => void;
};

const useDissociateTeacherSkill = ({
  onSuccess,
  onError,
}: DissociateTeacherSkillHookOptions) => {
  return useMutation<
    DissociateTeacherSkillResponse,
    unknown,
    DissociateTeacherSkillProps
  >({
    mutationFn: async (data: DissociateTeacherSkillProps) => {
      return await dissociateTeacherSkill(data);
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

export { useDissociateTeacherSkill };
