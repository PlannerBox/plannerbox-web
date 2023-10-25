import { Button, Typography } from 'antd';
import styles from './styles.module.scss';

export type UserElementProps = {
  firstname: string;
  lastname: string;
  email: string;
};

export default function UserElement({
  firstname,
  lastname,
  email,
}: UserElementProps) {
  const { Text } = Typography;

  return (
    <Button className={styles.userElement} type='text'>
      <Text>
        {firstname} {lastname}
      </Text>
      <Text type='secondary'>{email}</Text>
    </Button>
  );
}
