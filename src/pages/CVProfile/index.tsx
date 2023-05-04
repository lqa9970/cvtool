import { Container, Grid, Header } from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';

import BasicInfo from '../../components/BasicInfo/Basicinfo';
import BioForm from '../../components/Bio/Bio';
import AvatarCard from '../../components/FormAvatarCard/AvatarCard';
import useGetUser from '../../hooks/useGetUser';
import Education from '../../components/Education/Education';


interface ICVForm {}

const CreateCV = () => {
  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email!);

  if (!userDetails || !userDetails.id) return null;

  return (
    <>
      <Container className="dashboard">
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <AvatarCard />
            </Grid.Column>
            <Grid.Column width={10}>
              <BasicInfo userDetails={userDetails} />
              <Header as="h3" dividing>
                Bio Description
              </Header>
              <BioForm bio={userDetails?.bio} userId={userDetails?.id} />
            </Grid.Column>
            <Grid.Column width={16}>
              <Header as="h3" dividing>
                Educations
              </Header>
              <Education
                education={userDetails?.education}
                userId={userDetails?.id}
              />
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
