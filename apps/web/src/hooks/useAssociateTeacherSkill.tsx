import { useMutation } from '@tanstack/react-query';
import {
  AssociateTeacherSkillProps,
  AssociateTeacherSkillResponse,
  associateTeacherSkill,
} from 'api-client';

type AssociateTeacherSkillHookOptions = {
  onSuccess?: (data: AssociateTeacherSkillResponse) => void;
  onError?: (error: unknown) => void;
};

const useAssociateTeacherSkill = ({
  onSuccess,
  onError,
}: AssociateTeacherSkillHookOptions) => {
  return useMutation<
    AssociateTeacherSkillResponse,
    unknown,
    AssociateTeacherSkillProps
  >({
    mutationFn: async (data: AssociateTeacherSkillProps) => {
      return await associateTeacherSkill(data);
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

export { useAssociateTeacherSkill };
