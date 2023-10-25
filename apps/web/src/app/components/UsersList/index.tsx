import UserElement, { UserElementProps } from './partials/UserElement';

export type UsersListProps = {
  users: UserElementProps[];
};

export default function UsersList({ users }: UsersListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
        overflowY: 'auto',
        maxHeight: '50vh',
      }}
    >
      {users.map((userInformations) => (
        <UserElement {...userInformations} key={userInformations.email} />
      ))}
    </div>
  );
}
