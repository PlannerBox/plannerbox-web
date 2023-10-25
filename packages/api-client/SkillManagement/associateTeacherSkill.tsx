import { apiCall } from '../utils/api';

export type AssociateTeacherSkillProps = {
  teacherId: string;
  skillIds: string[];
};

export type AssociateTeacherSkillResponse = {
  statusCode: number;
  message: string;
};

const associateTeacherSkill = async ({
  teacherId,
  skillIds,
}: AssociateTeacherSkillProps): Promise<AssociateTeacherSkillResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill-management/skill/teacher/add`,
    {
      method: 'POST',
      body: JSON.stringify({ teacherId, skillIds }),
    }
  );
};

export { associateTeacherSkill };
