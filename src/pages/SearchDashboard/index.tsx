import { useState } from "react";
import { Grid } from "semantic-ui-react";

import DisplayMatchCard from "../../components/DisplayMatchCard/DisplayMatchCard";
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter";
import EmployeeSearch from "../../components/EmployeeSearch/EmployeeSearch";
import { useUserContext } from "../../context/UserContext";
import { EmployeeUser } from "../../types/types";
import "./index.scss";

function SearchDashboard() {
  const { user } = useUserContext();

  const [filterResults, setFilterResults] = useState<EmployeeUser[]>([]);
  const [searchResults, setSearchResults] = useState<EmployeeUser[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  let displayComponent = <p />;

  if (lastUpdated === "search") {
    displayComponent = <DisplayMatchCard results={searchResults} />;
  } else if (lastUpdated === "filter") {
    displayComponent = <DisplayMatchCard results={filterResults} />;
  } else {
    displayComponent = <p />;
  }

  return (
    <>
      {user ? (
        <div id="grid-box">
          <Grid stackable divided doubling columns={2}>
            <Grid.Column width={4}>
              <EmployeeFilter
                setLastUpdated={setLastUpdated}
                setFilterResults={setFilterResults}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <EmployeeSearch
                setLastUpdated={setLastUpdated}
                setSearchResults={setSearchResults}
              />
              {displayComponent}
            </Grid.Column>
          </Grid>
        </div>
      ) : (
        <p>null</p>
      )}
    </>
  );
}

export default SearchDashboard;
