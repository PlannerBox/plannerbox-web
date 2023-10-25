import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  id?: string;
  name?: string;
};

export type ListRoomsProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type Place = {
  id: string;
  city: string;
  street: string;
  streetNumber: string;
};

export type Room = {
  id: string;
  name: string;
  place: Place;
};

export type Material = {
  id: string;
  name: string;
};

export type UseMaterial = {
  number: number;
  room: Room;
  material: Material;
};

export type ListRoomsData = {
  id: string;
  name: string;
  place: Place;
  useMaterial: UseMaterial;
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type GetListRoomsResponse = {
  data: ListRoomsData[];
  meta: MetaData;
};

const listRooms = async (
  props: ListRoomsProps,
  session: string
): Promise<GetListRoomsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/room/getfilter`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.id && props.filter.id !== '') {
    url = addQueryParams(url, 'filter.id', `$eq:${props.filter.id}`);
  }

  if (props.filter?.name && props.filter.name !== '') {
    url = addQueryParams(url, 'filter.name', `$eq:${props.filter.name}`);
  }

  return await apiCall(url, {
    method: 'GET',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { listRooms };
