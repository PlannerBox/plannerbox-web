import { useMutation } from '@tanstack/react-query';
import { DeleteRoomResponse, deleteRoom } from 'api-client';

type DeleteRoomHookOptions = {
  onSuccess?: (data: DeleteRoomResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteRoom = ({ onSuccess, onError }: DeleteRoomHookOptions) => {
  return useMutation<DeleteRoomResponse, unknown, string>({
    mutationFn: async (placeId: string) => {
      return await deleteRoom({
        id: placeId,
      });
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

export { useDeleteRoom };
