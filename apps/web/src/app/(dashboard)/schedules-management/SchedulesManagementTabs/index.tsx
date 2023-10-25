'use client';

import { Button } from 'antd';
import Calendar from '../../../components/Calendar';
import styles from './styles.module.scss';

export default function SchedulesManagementTabs({}) {
  // Fake Data
  const dateA = new Date();

  const dateB = new Date();
  dateB.setDate(dateB.getDate() + 7);

  const dateC = new Date();
  dateC.setDate(dateC.getDate() + 9);

  const trainings = [
    { title: 'Anthony FOUBRO', date: dateA, backgroundColor: 'pink' },
    { title: 'Norbert DUPUIT', date: dateA, backgroundColor: 'cyan' },
    { title: 'Yasmine AREZA', date: dateB, backgroundColor: 'cyan' },
    { title: 'Malcolm NOLASTNAME', date: dateB, backgroundColor: 'cyan' },
    { title: 'Francis NOLASTNAME', date: dateB, backgroundColor: 'cyan' },
    { title: 'Dewey NOLASTNAME', date: dateC, backgroundColor: 'pink' },
    { title: 'Jesse PINKMAN', date: dateC, backgroundColor: 'pink' },
  ];
  // End of Fake Data

  return (
    <div className={styles.calendarTab}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 'var(--spacing-16) var(--spacing-8)',
        }}
      >
        <Button type='primary'>Planifier un cours</Button>
      </div>
      <Calendar events={trainings} />
    </div>
  );
}
