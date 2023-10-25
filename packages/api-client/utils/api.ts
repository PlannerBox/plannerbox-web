export type SendRequestProps = {
  url: string;
  method: string;
  body: string;
  headers?: HeadersInit;
};

const apiCall = (input: RequestInfo | URL, init?: RequestInit) => {
  const options: RequestInit = {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...init?.headers,
    }),
    ...init,
  };

  return fetch(input, options).then(async (res) => {
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`${res.status} ${res.statusText}`);
  });
};

const addQueryParams = (url: string, key: string, value: string) => {
  const urlObject = new URL(url);
  urlObject.searchParams.set(key, value);
  return urlObject.toString();
};

export { addQueryParams, apiCall };
