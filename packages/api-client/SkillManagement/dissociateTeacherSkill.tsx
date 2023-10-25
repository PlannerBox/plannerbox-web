import { apiCall } from '../utils/api';

export type DissociateTeacherSkillProps = {
  teacherId: string;
  skillIds: string[];
};

export type DissociateTeacherSkillResponse = {
  statusCode: number;
  message: string;
};

const dissociateTeacherSkill = async ({
  teacherId,
  skillIds,
}: DissociateTeacherSkillProps): Promise<DissociateTeacherSkillResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/teacher/delete`,
    {
      method: 'POST',
      body: JSON.stringify({ teacherId, skillIds }),
    }
  );
};

export { dissociateTeacherSkill };
