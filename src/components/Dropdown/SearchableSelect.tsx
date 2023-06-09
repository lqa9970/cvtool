import { SyntheticEvent } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

type SearchableSelectProps = {
  allOptions: Option[];
  placeholder: string;
  multiSelected?: boolean;
  value: string[];
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
  value,
  filter
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
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchableSelect;
