import { SyntheticEvent, useState } from 'react';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react-yz';
import { Form } from 'semantic-ui-react';

import './Calendar.scss';

type Calendar = {
  date: string;
  time: string;
  dateTime: string;
  datesRange: string;
};

type CalendarProps = {
  option: 'date range' | 'date time' | 'date' | 'time';
};

function CustomCalendar({ option }: CalendarProps) {
  const [calendar, setCalendar] = useState<Calendar>({
    date: '',
    time: '',
    dateTime: '',
    datesRange: ''
  });

  const handleChange = (
    event: SyntheticEvent,
    { name, value }: { name: string; value: string }
  ) => {
    if (calendar.hasOwnProperty(name)) {
      setCalendar((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="calender">
      {(() => {
        switch (option) {
          case 'date':
            return (
              <>
                <Form>
                  <DateInput
                    closable
                    clearable
                    name="date"
                    placeholder="Date"
                    value={calendar.date}
                    iconPosition="left"
                    onChange={handleChange}
                  />
                </Form>
              </>
            );

          case 'time':
            return (
              <>
                <Form>
                  <TimeInput
                    closable
                    clearable
                    name="time"
                    placeholder="Time"
                    value={calendar.time}
                    iconPosition="left"
                    onChange={handleChange}
                  />
                </Form>
              </>
            );

          case 'date time':
            return (
              <>
                <Form>
                  <DateTimeInput
                    closable
                    clearable
                    name="dateTime"
                    placeholder="Date Time"
                    value={calendar.dateTime}
                    iconPosition="left"
                    onChange={handleChange}
                  />
                </Form>
              </>
            );

          case 'date range':
            return (
              <>
                <Form>
                  <DatesRangeInput
                    clearable
                    closable
                    name="datesRange"
                    placeholder="From - To"
                    value={calendar.datesRange}
                    iconPosition="left"
                    onChange={handleChange}
                  />
                </Form>
              </>
            );
          default:
            <></>;
            break;
        }
      })()}
    </div>
  );
}

export default CustomCalendar;
