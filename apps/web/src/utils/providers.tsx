'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';
import React from 'react';
import { CookiesProvider } from 'react-cookie';

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },
        }}
        locale={frFR}
      >
        <CookiesProvider>{children}</CookiesProvider>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
