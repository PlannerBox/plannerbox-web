import { apiCall } from '../utils/api';

export type UpdateSkillProps = {
  id: string;
  name: string;
};

export type UpdateSkillResponse = {};

const updateSkill = async ({
  id,
  name,
}: UpdateSkillProps): Promise<UpdateSkillResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/update`,
    {
      method: 'POST',
      body: JSON.stringify({ id, name }),
    }
  );
};

export { updateSkill };
