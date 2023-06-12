import { Grid, GridColumn, Header } from 'semantic-ui-react';
import { EmployeeUser } from '../../types/types';
import EmployeeProfileCard from '../EmployeeCard/EmployeeProfileCard';

function DisplayMatchCard({ results }: { results: EmployeeUser[] }) {
  return (
    <Grid divided="vertically" id="display">
      <Header as="h3">Result: {Object.keys(results).length}</Header>
      <Grid.Row columns={3}>
        {results.map((employee: any) => (
          <GridColumn key={employee.id}>
            <EmployeeProfileCard employee={employee} />
          </GridColumn>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default DisplayMatchCard;
