import { apiCall } from '../utils/api';

export type CreateSkillProps = {
  name: string;
};

export type CreateSkillResponse = {};

const createSkill = async ({
  name,
}: CreateSkillProps): Promise<CreateSkillResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/create`,
    {
      method: 'POST',
      body: JSON.stringify({ name }),
    }
  );
};

export { createSkill };
