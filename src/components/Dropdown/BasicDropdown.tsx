import { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";

type BasicDropdownProps = {
  options: DropdownItemProps[];
  fieldName: string;
  value: string;
  reset: boolean;
  setFieldValue: (
    field: string,
    value: string,
    validate?: boolean | undefined
  ) => void;
};

function BasicDropdown(props: BasicDropdownProps) {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue("");
  }, [props.reset]);
  const handleChange = (
    event: SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setValue(data.value as string);
    props.setFieldValue(props.fieldName, data.value as string);
  };
  return (
    <Dropdown
      selection
      value={value}
      options={props.options}
      onChange={handleChange}
    />
  );
}

export default BasicDropdown;
