import { SyntheticEvent } from "react";
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput,
} from "semantic-ui-calendar-react-yz";

type CalendarProps = {
  option: "date range" | "date time" | "date" | "time";
  value: string;
  name: string;
  placeholder?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

function CustomCalendar({
  option,
  value,
  name,
  placeholder = "Date",
  setFieldValue,
}: CalendarProps) {
  const handleCalendarChange = (
    event: SyntheticEvent<HTMLElement>,
    // ! These names were already declared in the upper scope.
    { name: name_, value: value_ }: any
  ) => {
    setFieldValue(name_ as string, value_);
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
