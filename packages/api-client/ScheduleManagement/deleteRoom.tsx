import { apiCall } from '../utils/api';

export type DeleteRoomProps = {
  id: string;
};

export type DeleteRoomResponse = {};

const deleteRoom = async ({
  id,
}: DeleteRoomProps): Promise<DeleteRoomResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/place/delete?id=${id}`,
    {
      method: 'DELETE',
    }
  );
};

export { deleteRoom };
