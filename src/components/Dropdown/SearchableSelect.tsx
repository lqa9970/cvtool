import { SyntheticEvent } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

type SearchableSelectProps = {
  allOptions: Option[];
  placeholder: string;
  multiSelected?: boolean;
  value?: string[];
  onSelect: (value: string[]) => void;
};

type Option = {
  text: string;
  value: string;
};

function SearchableSelect({
  allOptions,
  placeholder,
  multiSelected,
  value,
  onSelect
}: SearchableSelectProps) {
  const handleChange = (event: SyntheticEvent, data: DropdownProps) => {
    event.preventDefault();
    onSelect(data.value as string[]);
  };

  return (
    <Dropdown
      search
      fluid
      selection
      placeholder={placeholder}
      multiple={multiSelected}
      options={allOptions}
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchableSelect;
