import { useQuery } from '@tanstack/react-query';
import { ListRoomsProps, listRooms } from 'api-client';
import { useCookies } from 'react-cookie';

const useListRooms = (props: ListRoomsProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useListRooms');
  return useQuery({
    queryKey: ['listRooms', props],
    queryFn: () => listRooms(props, cookies['session']),
  });
};

export { useListRooms };
