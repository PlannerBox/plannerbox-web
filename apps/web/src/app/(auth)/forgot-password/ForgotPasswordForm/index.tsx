'use client';

import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { ResetPasswordResponse } from 'api-client';
import { useEffect, useState } from 'react';
import { isValidEmail } from 'utils';
import { useResetPassword } from './hooks';
import styles from './styles.module.scss';

export default function ForgotPasswordForm() {
  const { Text } = Typography;

  const [form] = Form.useForm();
  const [email, setEmail] = useState('');

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<undefined | string>(
    undefined
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState<number | undefined>(undefined);

  const {
    mutate: fetchResetPassword,
    isLoading,
    isSuccess,
  } = useResetPassword({ onSuccess: handleSuccess, onError: handleError });

  function handleSuccess(data: ResetPasswordResponse) {
    if (!!data) {
      setSuccessMessage('Mail de réinitialisation envoyé');
    } else {
      setErrorMessage(
        'Une erreur est survenue lors de la connexion. Veuillez réessayer'
      );
    }
  }

  function handleError() {
    setErrorMessage(
      'Une erreur est survenue lors de la connexion. Veuillez réessayer'
    );
    setIsDisabled(true);
    setTimer(5);
  }

  const onFinish = () => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    setIsDisabled(true);
    setTimer(30);
    fetchResetPassword({ email: email });
  };

  useEffect(() => {
    if (timer !== undefined && isDisabled) {
      if (timer > 0) {
        const countdown = setInterval(() => {
          setTimer((prevTimer) => prevTimer! - 1);
        }, 1000);

        return () => {
          clearInterval(countdown);
        };
      } else {
        setIsDisabled(false);
      }
    }
  }, [timer, isDisabled]);

  return (
    <Form
      form={form}
      layout='vertical'
      className={styles.wrapper}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Text className={styles.title}>Mot de passe oublié ?</Text>
      <Text className={styles.details} type='secondary'>
        Pas d’inquiétude, nous allons vous aider à le réinitialiser
      </Text>
      {(!!errorMessage || !!successMessage) && (
        <div className={styles.message}>
          {!!errorMessage && (
            <Alert message={errorMessage} type='error' showIcon />
          )}
          {!!successMessage && (
            <Alert message={successMessage} type='success' showIcon />
          )}
        </div>
      )}
      <div className={styles.inputs}>
        <Form.Item name='email' label='Adresse mail' required>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Adresse mail'
            prefix={<UserOutlined />}
            type='email'
            status={
              email.length > 0 && !isValidEmail(email) ? 'error' : undefined
            }
          />
        </Form.Item>
      </div>
      <div className={styles.actions}>
        <Button
          htmlType='submit'
          type='primary'
          loading={isLoading || (isSuccess && !!errorMessage)}
          disabled={isDisabled || !isValidEmail(email)}
        >
          {timer === undefined
            ? 'Réinitialiser le mot de passe'
            : `Renvoyer le mail de réinitialisation${
                timer > 0 ? ` (${timer}s)` : ''
              }`}
        </Button>
        <Link href='/sign-in'>
          <ArrowLeftOutlined /> Retour à la connexion
        </Link>
      </div>
    </Form>
  );
}
