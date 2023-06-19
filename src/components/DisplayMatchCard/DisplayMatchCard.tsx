import { useEffect, useMemo, useState } from "react";
import { Grid, GridColumn, Header, Pagination } from "semantic-ui-react";
import { EmployeeUser } from "../../types/types";
import EmployeeProfileCard from "../EmployeeCard/EmployeeProfileCard";

const PAGINATION_SIZE = 12; // Results on one page

function DisplayMatchCard({ results }: { results: EmployeeUser[] }) {
  const pageCount = useMemo(
    () => Math.ceil(results.length / PAGINATION_SIZE),
    [results]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = useMemo(
    () =>
      currentPage === pageCount
        ? results.length
        : currentPage * PAGINATION_SIZE,
    [currentPage, results, pageCount]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  return (
    <Grid divided="vertically" id="display">
      <Header as="h3">
        Showing {(currentPage - 1) * PAGINATION_SIZE + 1} to {lastItemIndex} of{" "}
        {results.length} talents
      </Header>
      <Grid.Row columns={3}>
        {results
          .slice(
            (currentPage - 1) * PAGINATION_SIZE, // Doing - 1 because index starts from 1 and not 0
            currentPage * PAGINATION_SIZE
          )
          .map((employee) => (
            <GridColumn key={employee.id}>
              <EmployeeProfileCard employee={employee} />
            </GridColumn>
          ))}
      </Grid.Row>
      <Grid.Row centered>
        <Pagination
          activePage={currentPage}
          totalPages={pageCount}
          firstItem={null}
          lastItem={null}
          onPageChange={(_event, { activePage }) =>
            setCurrentPage(activePage as number)
          }
        />
      </Grid.Row>
    </Grid>
  );
}

export default DisplayMatchCard;
