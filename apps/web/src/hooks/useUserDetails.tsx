import { useQuery } from '@tanstack/react-query';
import { GetUserDetailsProps, getUserDetails } from 'api-client';
import { useCookies } from 'react-cookie';

const useUserDetails = (props: GetUserDetailsProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useUserDetails');
  return useQuery({
    queryKey: ['userDetails', props.accountId],
    queryFn: () => getUserDetails(props, cookies['session']),
  });
};

export { useUserDetails };
