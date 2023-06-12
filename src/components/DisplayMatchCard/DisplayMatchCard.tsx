import { Grid, GridColumn, Header } from 'semantic-ui-react';
import EmployeeProfileCard from '../EmployeeCard/EmployeeProfileCard';
import { EmployeeUser } from '../../types/types';

const DisplayMatchCard = ({ results }: { results: EmployeeUser[] }) => {
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
};

export default DisplayMatchCard;
