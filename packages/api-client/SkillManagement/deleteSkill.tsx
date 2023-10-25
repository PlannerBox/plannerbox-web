import { apiCall } from '../utils/api';

export type DeleteSkillProps = {
  skillId: string;
};

export type DeleteSkillResponse = {};

const deleteSkill = async ({
  skillId,
}: DeleteSkillProps): Promise<DeleteSkillResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/delete/${skillId}`,
    {
      method: 'DELETE',
    }
  );
};

export { deleteSkill };
