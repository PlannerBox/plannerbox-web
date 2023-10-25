import { apiCall } from '../utils/api';

export type UpdateRoomProps = {
  id: string;
  name: string;
};

export type UpdateRoomResponse = {};

const updateRoom = async ({
  id,
  name,
}: UpdateRoomProps): Promise<UpdateRoomResponse> => {
  return await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/room/update`, {
    method: 'POST',
    body: JSON.stringify({ id, name }),
  });
};

export { updateRoom };
