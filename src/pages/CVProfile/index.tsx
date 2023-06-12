import { useOktaAuth } from "@okta/okta-react";
import {
  Container,
  Grid,
  Header,
  Button,
  TransitionablePortal,
  Segment,
} from "semantic-ui-react";

import BasicInfo from "../../components/BasicInfo/Basicinfo";
import BioForm from "../../components/Bio/Bio";
import Education from "../../components/Education/Education";
import AvatarCard from "../../components/FormAvatarCard/AvatarCard";
import LanguagesSelect from "../../components/LanguagesSelect/LanguagesSelect";
import Socials from "../../components/Socials/Socials";
import useGetUser from "../../hooks/useGetUser";
import CVPreview from "../CVPreview";

import "./index.scss";

function CreateCV() {
  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email || "");

  if (!userDetails?.id) {
    return <p />;
  }

  return (
    <>
      <Container className="dashboard">
        <Grid columns={2} stackable>
          <Grid.Column width={5}>
            <AvatarCard />
            <TransitionablePortal
              closeOnTriggerClick
              transition={{ animation: "fade left", duration: "500" }}
              openOnTriggerClick
              trigger={<Button content="Preview CV" secondary />}
            >
              <Segment id="cv-preview-container">
                <CVPreview employee={userDetails} />
              </Segment>
            </TransitionablePortal>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                  Basic Info
                </Header>
                <BasicInfo userDetails={userDetails} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                  Bio Description
                </Header>
                <BioForm bio={userDetails?.bio} userId={userDetails?.id} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                  Links
                </Header>
                {userDetails && <Socials userDetails={userDetails} />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                  Language Skills
                </Header>
                <LanguagesSelect
                  profileLanguages={userDetails?.languages}
                  userId={userDetails?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
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
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default CreateCV;
