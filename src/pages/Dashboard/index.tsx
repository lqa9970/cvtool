import { Grid, GridColumn, Button, Header, Popup } from "semantic-ui-react";
import UserCard from "../../components/UserCard";
import './index.css'


const Dashboard = () => {
  return (
    <div className="dashboard">
      <Grid>
        <Grid.Column width={4}>
          <UserCard />
        </Grid.Column>
        <GridColumn width={6}>
          <Header>My Nordcloud CV</Header>
          <Popup content='fill in your CV' trigger={<Button icon='add' size='massive' onClick={()=>alert('add')}/>} />
        </GridColumn>
        <GridColumn width={6}>
          <Header>last activites</Header>
        </GridColumn>
      </Grid>
    </div>
  );
};
export default Dashboard;
