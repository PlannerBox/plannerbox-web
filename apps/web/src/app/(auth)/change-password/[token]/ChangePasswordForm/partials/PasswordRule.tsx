import { InfoCircleOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import styles from './styles.module.scss';

type PasswordRuleProps = {
  content: string;
  status: 'default' | 'success' | 'error';
};

const { useToken } = theme;

const PasswordRule = ({ content, status }: PasswordRuleProps) => {
  const { token } = useToken();

  const color =
    status === 'default'
      ? token.colorText
      : status === 'success'
      ? token.colorSuccessText
      : token.colorErrorText;

  return (
    <div className={`${styles.container}`} style={{ color: color }}>
      <InfoCircleOutlined color={color} /> {content}
    </div>
  );
};

export { PasswordRule };
