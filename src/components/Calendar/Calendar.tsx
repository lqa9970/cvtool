import { SyntheticEvent } from 'react';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react-yz';

type CalendarProps = {
  option: 'date' | 'time' | 'date time' | 'date range';
  value: string;
  name: string;
  placeholder?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const CustomCalendar = ({
  option,
  value,
  name,
  placeholder = 'Date',
  setFieldValue
}: CalendarProps) => {
  const handleCalendarChange = (
    event: SyntheticEvent<HTMLElement, Event>,
    { name, value }: any
  ) => {
    setFieldValue(name, value);
  };

  return (
    <>
      {(() => {
        switch (option) {
          case "date":
            return (
              <DateInput
                closable
                name={name}
                placeholder={placeholder}
                value={value}
                iconPosition="left"
                onChange={handleCalendarChange}
              />
            );

          case "time":
            return (
              <>
                <TimeInput
                  closable
                  clearable
                  name={name}
                  placeholder={placeholder}
                  value={value}
                  iconPosition="left"
                  onChange={handleCalendarChange}
                />
              </>
            );

          case "date time":
            return (
              <>
                <DateTimeInput
                  closable
                  clearable
                  name={name}
                  placeholder={placeholder}
                  value={value}
                  iconPosition="left"
                  onChange={handleCalendarChange}
                />
              </>
            );

          case "date range":
            return (
              <>
                <DatesRangeInput
                  clearable
                  closable
                  name={name}
                  placeholder={placeholder}
                  value={value}
                  iconPosition="left"
                  onChange={handleCalendarChange}
                />
              </>
            );
          default:
            <></>;
            break;
        }
      })()}
    </>
  );
}

export default CustomCalendar;
