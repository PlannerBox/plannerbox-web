import { useQuery } from '@tanstack/react-query';
import { GetListSkillsProps, getListSkills } from 'api-client';
import { useCookies } from 'react-cookie';

const useListSkills = (props: GetListSkillsProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useListSkills');
  return useQuery({
    queryKey: ['useListSkills', props],
    queryFn: () => getListSkills(props, cookies['session']),
  });
};

export { useListSkills };
