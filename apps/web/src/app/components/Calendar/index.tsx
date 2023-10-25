import { EventContentArg, EventSourceInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Badge, Button, Radio, RadioChangeEvent } from 'antd';
import { useRef, useState } from 'react';
import Event from './partials/Event';
import styles from './styles.module.scss';

export type CalendarProps = {
  events?: EventSourceInput;
};

export type CalendarViewMode = 'dayGridDay' | 'dayGridWeek' | 'dayGridMonth';

const Calendar = ({ events }: CalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarAPI = calendarRef?.current?.getApi();
  const [viewMode, setViewMode] = useState<CalendarViewMode>('dayGridMonth');

  const renderEventContent = (eventInfo: EventContentArg) => (
    <Event eventInfo={eventInfo} viewMode={viewMode} />
  );

  const handleTodayClick = () => {
    calendarAPI?.today();
  };

  const handlePreviousClick = () => {
    calendarAPI?.prev();
  };

  const handleNextClick = () => {
    calendarAPI?.next();
  };

  const handleViewModeChange = (event: RadioChangeEvent) => {
    const newViewMode: CalendarViewMode = event.target.value;
    setViewMode(newViewMode);
    calendarAPI?.changeView(newViewMode);
  };

  return (
    <div>
      <div className={styles.headerToolbar}>
        <div className={styles.headerToolbarActionsGroup}>
          <Button onClick={handleTodayClick}>Aujourd&apos;hui</Button>
          <Button onClick={handlePreviousClick}>{'<'}</Button>
          <Button onClick={handleNextClick}>{'>'}</Button>
        </div>
        <div className={styles.headerToolbarActionsGroup}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => handleViewModeChange(e)}
          >
            <Radio.Button value='dayGridDay'>Jour</Radio.Button>
            <Radio.Button value='dayGridWeek'>Semaine</Radio.Button>
            <Radio.Button value='dayGridMonth'>Mois</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={frLocale}
        initialView='dayGridMonth'
        events={events}
        eventContent={renderEventContent}
        headerToolbar={false}
        weekends={false}
        selectable={true}
      />
      <div className={styles.caption}>
        <Badge color='pink' text='Remises à niveau' />
        <Badge color='cyan' text='Formations' />
      </div>
    </div>
  );
};

export default Calendar;
