import { useState, useEffect, SyntheticEvent } from 'react';
import { Grid, Header, Search, SearchProps } from 'semantic-ui-react';

import useKeywordSearch from '../../hooks/useKeywordSearch';
import { EmployeeUser } from '../../types/types';

type EmployeeSearchProps = {
  setLastUpdated: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<EmployeeUser[]>>;
};

const EmployeeSearch = ({ setLastUpdated, setSearchResults }: EmployeeSearchProps) => {
  const [keyword, setKeyword] = useState('');
  const searchResults = useKeywordSearch(keyword);
  setSearchResults(searchResults); // Empty array when search doesn't match
  useEffect(() => {
    if (keyword !== '') {
      setLastUpdated('search');
    }
  }, [keyword]);

  const handleSearchChange = (event:SyntheticEvent, data: SearchProps) => {
    const { value } = data;
    if (value !== undefined) { // Handle the case when data.value is an empty string
      setKeyword(value);
    }
};

  return (
    <Grid divided="vertically" id="display">
      <Grid.Row columns={5}>
        <Grid.Column>
          <Header as="h4"> Keyword search</Header>
          <Search
            onSearchChange={handleSearchChange}
            value={keyword}
            showNoResults={false}
            placeholder="search..."
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EmployeeSearch;