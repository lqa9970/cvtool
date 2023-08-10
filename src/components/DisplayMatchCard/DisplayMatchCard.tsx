import { Grid, GridColumn, Header, Pagination } from "semantic-ui-react";
import usePagination from "../../hooks/usePagination";
import { EmployeeUser } from "../../types/types";
import EmployeeProfileCard from "../EmployeeCard/EmployeeProfileCard";

function DisplayMatchCard({ results }: { results: EmployeeUser[] }) {
  const {
    currentPage,
    setCurrentPage,
    pageCount,
    items,
    showingFrom,
    showingTo,
  } = usePagination(results);

  return (
    <Grid divided="vertically" id="display">
      {!showingFrom && !showingTo ? (
        <Header as="h3">No talent found</Header>
      ) : (
        <>
          <Header as="h3">
            Showing {showingFrom + 1} to {showingTo} of {results.length} talents
          </Header>
          <Grid.Row columns={3}>
            {items.map((employee) => (
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
        </>
      )}
    </Grid>
  );
}

export default DisplayMatchCard;
