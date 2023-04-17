import { useState } from "react";
import ninja from "../../assets/ninja.png";
import { Container, Grid, Image, Button, Card, Header} from 'semantic-ui-react';


const BasicInfo = () => {
  const [user, setUser] = useState({
    name: "Emilia Strömberg",
    position: "Design Lead, Team Lead",
    address: "Berlin, Germany",
    email: "emma.Stromberg@nordcloud.com",
    phone: "+49 176 5432 1098",
    desc: "Team: Build/Design - DACHSuperior",
    manager: "Anna Doe",
    managerEmail: "anna.doe@nordcloud.com",
    nationality: "Finnish"
  });

  return (
    <>
      <Container className="dashboard">
        <Grid columns={2} stackable>
            <Grid.Row>
            <Grid.Column width={6}>
                <Card>
                    <Image src={ninja} size='small' wrapped ui={false} />
                    <Card.Content extra>
                        <Button disabled style={{backgroundColor: 'rgb(22,22,50)', color: 'white' }}>
                            Change Avatar
                        </Button>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column width={10}>
                <div className="field">
                    <Header as='h3' dividing>
                        Basic Info
                    </Header>
                    <Header size="large">{user.name}</Header>
                    <Header size='small'>{user.position}</Header>
                    <Header.Subheader>
                        <i className="envelope icon"></i>
                        {user.email}
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="address card icon"></i>
                        {user.address}
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="phone square icon"></i>
                        {user.nationality}
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="user square icon"></i>
                        Manager: {user.manager}
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="envelope square icon"></i>
                        Manger Email: {user.managerEmail}
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="phone square icon"></i>
                        {user.phone}
                    </Header.Subheader>
                </div>   
            </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
    </>
  );
};

export default BasicInfo;