import { useQuery } from '@tanstack/react-query';
import { ListRolePermissionsProps, listRolePermissions } from 'api-client';
import { useCookies } from 'react-cookie';

const useListRolePermissions = (props: ListRolePermissionsProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useListRolePermissions');
  return useQuery({
    queryKey: ['listRolePermissions'],
    queryFn: () => listRolePermissions(props, cookies['session']),
  });
};

export { useListRolePermissions };
