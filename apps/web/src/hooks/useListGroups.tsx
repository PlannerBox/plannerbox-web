import { useQuery } from '@tanstack/react-query';
import { ListGroupsProps, listGroups } from 'api-client';
import { useCookies } from 'react-cookie';

const useListGroups = (props: ListGroupsProps) => {
  const [cookies] = useCookies(['session']);
  return useQuery({
    queryKey: ['listGroups', props],
    queryFn: () => listGroups(props, cookies['session']),
  });
};

export { useListGroups };
