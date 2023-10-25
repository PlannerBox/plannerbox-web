import { EventContentArg } from '@fullcalendar/core';
import { Badge, Tooltip } from 'antd';
import { CalendarViewMode } from '..';

export type EventProps = {
  eventInfo: EventContentArg;
  viewMode: CalendarViewMode;
};

const Event = ({ eventInfo, viewMode }: EventProps) => {
  const e = eventInfo.event;
  const startTime = e.start
    ? `${e.start?.getHours()}:${
        e.start.getMinutes() < 10 ? '0' : ''
      }${e.start?.getMinutes()}`
    : undefined;
  const endTime = e.end
    ? `${e.end?.getHours()}:${e.end?.getMinutes()}`
    : undefined;

  let displayedText;
  switch (viewMode) {
    case 'dayGridDay':
      displayedText = `${
        startTime && endTime
          ? startTime + ' - ' + endTime + ' '
          : startTime
          ? startTime + ' '
          : ''
      }${e.title}`;
      break;
    case 'dayGridWeek':
      displayedText = `${startTime ? startTime + ' ' : ''}${e.title}`;
      break;
    case 'dayGridMonth':
      displayedText = e.title;
      break;
  }

  return (
    <Tooltip title={displayedText} trigger='hover'>
      <Badge
        color={eventInfo.backgroundColor}
        text={displayedText}
        style={{ padding: '0 8px', overflow: 'hidden' }}
      />
    </Tooltip>
  );
};

export default Event;
