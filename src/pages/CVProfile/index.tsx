import { Container, Grid, Header } from 'semantic-ui-react';
import { Button, TransitionablePortal, Segment } from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';

import BasicInfo from '../../components/BasicInfo/Basicinfo';
import BioForm from '../../components/Bio/Bio';
import AvatarCard from '../../components/FormAvatarCard/AvatarCard';
import Socials from '../../components/Socials/Socials';
import useGetUser from '../../hooks/useGetUser';
import LanguagesSelect from '../../components/LanguagesSelect/LanguagesSelect';
import Education from '../../components/Education/Education';
import CVPreview from '../CVPreview';
import { useState } from 'react';

import './index.scss';

const CreateCV = () => {
  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email!);
  const [openPreview, setOpenPreview] = useState({ open: false });

  if (!userDetails || !userDetails.id) return null;

  const handleOpen = () => {
    setOpenPreview({ open: true });
  };

  const handleClose = () => {
    setOpenPreview({ open: false });
  };

  return (
    <>
      <Container className="dashboard">
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <AvatarCard />
              <TransitionablePortal
                closeOnTriggerClick
                onOpen={handleOpen}
                onClose={handleClose}
                transition={{ animation: 'fade left', duration: '500' }}
                openOnTriggerClick
                trigger={<Button content={'Preview CV'} secondary />}
              >
                <Segment id="cv-preview-container">
                  <CVPreview />
                </Segment>
              </TransitionablePortal>
            </Grid.Column>
            <Grid.Column>
              <BasicInfo userDetails={userDetails} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column>
              <Header as="h3" dividing>
                Bio Description
              </Header>
              <BioForm bio={userDetails?.bio} userId={userDetails?.id} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column>
              <Header as="h3" dividing>
                Links
              </Header>
              {userDetails && <Socials userDetails={userDetails} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column>
              <Header as="h3" dividing>
                Language Skills
              </Header>
              <LanguagesSelect
                profileLanguages={userDetails?.languages}
                userId={userDetails?.id}
              ></LanguagesSelect>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column>
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
    </>
  );
};

export default CreateCV;
