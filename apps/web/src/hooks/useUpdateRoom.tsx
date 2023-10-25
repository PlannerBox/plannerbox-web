import { useMutation } from '@tanstack/react-query';
import { UpdateRoomProps, UpdateRoomResponse, updateRoom } from 'api-client';

type UpdateRoomHookOptions = {
  onSuccess?: (data: UpdateRoomResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateRoom = ({ onSuccess, onError }: UpdateRoomHookOptions) => {
  return useMutation<UpdateRoomResponse, unknown, UpdateRoomProps>({
    mutationFn: async (data: UpdateRoomProps) => {
      return await updateRoom(data);
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

export { useUpdateRoom };
