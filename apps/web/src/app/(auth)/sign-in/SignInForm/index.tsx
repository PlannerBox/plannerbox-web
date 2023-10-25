'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { SignInResponse } from 'api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { isValidEmail } from 'utils';
import { removeAfterSemicolon } from '../../../../utils/string';
import { useSignIn } from './hooks';
import styles from './styles.module.scss';

export default function SignInForm() {
  const router = useRouter();
  const { Text } = Typography;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form] = Form.useForm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const isDisabled = !isValidEmail(username) || password.length === 0;

  const [cookies, setCookie] = useCookies(['session', 'session_refresher']);

  const {
    mutate: fetchSignIn,
    isLoading,
    isSuccess,
  } = useSignIn({ onSuccess: handleSuccess, onError: handleError });

  function handleSuccess(data: SignInResponse) {
    if (!!data) {
      setCookie('session', removeAfterSemicolon(data.access_token), {
        path: '/',
        secure: false,
        maxAge: process.env.JWT_EXPIRATION_TIME,
      });
      setCookie('session_refresher', removeAfterSemicolon(data.refresh_token), {
        path: '/',
        secure: false,
        maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      });
      router.push('/dashboard');
    } else {
      setErrorMessage(
        'Une erreur est survenue lors de la connexion. Veuillez réessayer'
      );
    }
  }

  function handleError() {
    setErrorMessage('Adresse mail ou mot de passe incorrect');
  }

  const onFinish = () => {
    setErrorMessage(undefined);
    fetchSignIn({ username: username, password: password });
  };

  useEffect(() => {
    console.log('useEffect');
    if (cookies['session'] && cookies['session_refresher']) {
      console.log('cookies found');
      router.push('/dashboard');
    }
  }, [cookies, router]);

  return (
    <Form
      form={form}
      layout='vertical'
      className={styles.wrapper}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Text className={styles.title}>Bon retour parmi nous !</Text>
      <Text className={styles.details} type='secondary'>
        Merci de vous connecter pour accéder à la plateforme
      </Text>
      {!!errorMessage && (
        <div className={styles.message}>
          <Alert message={errorMessage} type='error' showIcon />
        </div>
      )}
      <div className={styles.inputs}>
        <Form.Item name='username' label="Nom d'utilisateur" required>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            prefix={<UserOutlined />}
            type='email'
            status={
              username.length > 0 && !isValidEmail(username)
                ? 'error'
                : undefined
            }
          />
        </Form.Item>
        <Form.Item label='Mot de passe' name='password' required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Mot de passe'
            prefix={<LockOutlined />}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: () => setPasswordVisible(!passwordVisible),
            }}
          />
        </Form.Item>
      </div>
      <div className={styles.actions}>
        <Button
          htmlType='submit'
          type='primary'
          loading={isLoading || (isSuccess && !!errorMessage)}
          disabled={isDisabled}
        >
          Se connecter
        </Button>
        <Button type='link' href='/forgot-password'>
          Mot de passe oublié
        </Button>
      </div>
    </Form>
  );
}
