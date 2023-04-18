import { Button, Card, Container, Grid, Header, Image } from "semantic-ui-react";
import BasicInfo from "../../components/BasicInfo/Basicinfo"
import BioForm from "../../components/Bio/Bio"
import ninja from "../../assets/ninja.png";

interface ICVForm {
}



const CreateCV = () => {

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
                <BasicInfo/>
                <Header as='h3' dividing>
                  Bio Description
                </Header>
                <BioForm/>
              </Grid.Column>
            </Grid.Row>
        </Grid>
        

    </Container>
    {/* <Button primary style={{ backgroundColor: 'rgb(22,22,50)', color: 'white' }} type="submit" onClick={()=>handleSubmit}>
      Save
    </Button> */}
    </>         
  );
};

export default CreateCV;