'use client';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Logo from '../components/Logo';
import styles from './styles.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Content className={styles.content}>
        <Logo className={styles.logo} />
        {children}
      </Content>
    </Layout>
  );
}
