import { useQuery } from '@tanstack/react-query';
import { GetUserSummaryProps, getUserSummary } from 'api-client';
import { useCookies } from 'react-cookie';

const useUserSummary = (props: GetUserSummaryProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useUserSummary');
  return useQuery({
    queryKey: ['userSummary', props],
    queryFn: () => getUserSummary(props, cookies['session']),
  });
};

export { useUserSummary };
