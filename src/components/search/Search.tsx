import React from 'react';
import { Search, SearchProps } from 'semantic-ui-react';

type SearchComponentProps = {
  placeholder: string;
  handleSearchChange: (
    event: React.MouseEvent<HTMLElement>,
    data: SearchProps
  ) => void;
};

function SearchComponent({
  placeholder,
  handleSearchChange
}: SearchComponentProps) {
  return (
    <Search placeholder={placeholder} onSearchChange={handleSearchChange} />
  );
}

export default SearchComponent;
