import { SyntheticEvent } from "react";
import Option from "react-select/dist/declarations/src/components/Option";
import { Dropdown, DropdownProps } from "semantic-ui-react";

type SearchableSelectProps = {
  allOptions: Option[];
  placeholder: string;
  multiSelected?: boolean;
  filter: (value: string[]) => void;
};

type Option = {
  text: string;
  value: string;
};

const SearchableSelect = ({
  allOptions,
  placeholder,
  multiSelected,
  filter,
}: SearchableSelectProps) => {
  const handleChange = (event: SyntheticEvent, data: DropdownProps) => {
    event.preventDefault();
    filter(data.value as string[]);
  };

  return (
    <Dropdown
      placeholder={placeholder}
      multiple={multiSelected}
      search
      fluid
      selection
      options={allOptions}
      onChange={handleChange}
    />
  );
};

export default SearchableSelect;
