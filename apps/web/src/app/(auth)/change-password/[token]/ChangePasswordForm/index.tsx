'use client';

import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { SignInResponse } from 'api-client';
import { ChangeEvent, useState } from 'react';
import { PasswordValidationResponse, checkPasswordValidity } from 'utils';
import { useChangePassword } from './hooks';
import { PasswordRule } from './partials/PasswordRule';
import styles from './styles.module.scss';

export type ChangePasswordFormProps = {
  token: string;
};

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
  const { Text } = Typography;

  const [form] = Form.useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [confirmedPasswordVisible, setConfirmedPasswordVisible] =
    useState(false);

  const [passwordValidity, setPasswordValidity] = useState<
    undefined | PasswordValidationResponse
  >(undefined);

  const confirmedPasswordValidity = password === confirmedPassword;

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<undefined | string>(
    undefined
  );

  const isDisabled = !passwordValidity?.result || !confirmedPasswordValidity;

  const {
    mutate: fetchChangePassword,
    isLoading,
    isSuccess,
  } = useChangePassword({
    token: token,
    password: password,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess(data: SignInResponse) {
    if (!!data) {
      setSuccessMessage('Mot de passe modifié');
    } else {
      setErrorMessage(
        'Une erreur est survenue lors de la modification. Veuillez réessayer'
      );
    }
  }

  function handleError() {
    setErrorMessage(
      'Une erreur est survenue lors de la modification. Veuillez réessayer'
    );
  }

  const onFinish = () => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    fetchChangePassword({ token, password });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    if (password.length > 0) {
      setPasswordValidity(checkPasswordValidity(password));
    } else {
      setPasswordValidity(undefined);
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      className={styles.wrapper}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Text className={styles.title}>Choisissez un nouveau mot de passe</Text>
      <Text className={styles.details} type='secondary'>
        Il ne reste plus qu’à saisir votre nouveau mot de passe
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
      {!successMessage && (
        <>
          <div className={styles.inputs}>
            <Form.Item label='Nouveau mot de passe' name='password' required>
              <Input.Password
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                placeholder='Nouveau mot de passe'
                prefix={<LockOutlined />}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: () => setPasswordVisible(!passwordVisible),
                }}
                status={
                  password.length > 0 && !!passwordValidity
                    ? passwordValidity.result
                      ? undefined
                      : 'error'
                    : undefined
                }
              />
            </Form.Item>
            <Form.Item
              label='Confirmer le nouveau mot de passe'
              name='password-confirmed'
              required
            >
              <Input.Password
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                placeholder='Confirmer le nouveau mot de passe'
                prefix={<LockOutlined />}
                visibilityToggle={{
                  visible: confirmedPasswordVisible,
                  onVisibleChange: () =>
                    setConfirmedPasswordVisible(!confirmedPasswordVisible),
                }}
                status={
                  password.length > 0 &&
                  confirmedPassword.length > 0 &&
                  !confirmedPasswordValidity
                    ? 'error'
                    : undefined
                }
              />
            </Form.Item>
          </div>
          <div className={styles.rules}>
            <div className={styles.split}>
              <div>
                <PasswordRule
                  content='10 caractères minimum'
                  status={
                    !passwordValidity
                      ? 'default'
                      : passwordValidity?.isMinLength
                      ? 'success'
                      : 'error'
                  }
                />
                <PasswordRule
                  content='une minuscule'
                  status={
                    !passwordValidity
                      ? 'default'
                      : passwordValidity?.hasLowercase
                      ? 'success'
                      : 'error'
                  }
                />
              </div>
              <div>
                <PasswordRule
                  content='un chiffre'
                  status={
                    !passwordValidity
                      ? 'default'
                      : passwordValidity?.hasDigit
                      ? 'success'
                      : 'error'
                  }
                />
                <PasswordRule
                  content='une majuscule'
                  status={
                    !passwordValidity
                      ? 'default'
                      : passwordValidity?.hasUppercase
                      ? 'success'
                      : 'error'
                  }
                />
              </div>
            </div>
            <PasswordRule
              content='un caractère spécial'
              status={
                !passwordValidity
                  ? 'default'
                  : passwordValidity?.hasSpecialChar
                  ? 'success'
                  : 'error'
              }
            />
            <PasswordRule
              content='maximum 2 caractères identiques à la suite'
              status={
                !passwordValidity
                  ? 'default'
                  : passwordValidity?.hasMaxIdenticalChars
                  ? 'success'
                  : 'error'
              }
            />
          </div>
        </>
      )}
      <div
        className={`${styles.actions} ${
          !!successMessage ? styles.success : ''
        }`}
      >
        {!successMessage ? (
          <>
            <Button
              htmlType='submit'
              type='primary'
              loading={isLoading || (isSuccess && !!errorMessage)}
              disabled={isDisabled}
            >
              Valider le nouveau mot de passe
            </Button>
            <Link href='/sign-in'>
              <ArrowLeftOutlined /> Retour à la connexion
            </Link>
          </>
        ) : (
          <Button type='primary' href='/sign-in'>
            Retour à la connexion
          </Button>
        )}
      </div>
    </Form>
  );
}
