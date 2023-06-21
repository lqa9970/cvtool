import { useOktaAuth } from "@okta/okta-react";
import {
  Container,
  Grid,
  Header,
  Button,
  TransitionablePortal,
  Segment,
  Divider,
} from "semantic-ui-react";

import BasicInfo from "../../components/BasicInfo/Basicinfo";
import BioForm from "../../components/Bio/Bio";
import Education from "../../components/Education/Education";
import AvatarCard from "../../components/FormAvatarCard/AvatarCard";
import LanguagesSelect from "../../components/LanguagesSelect/LanguagesSelect";
import Socials from "../../components/Socials/Socials";
import useGetUser from "../../hooks/useGetUser";
import CVPreview from "../CVPreview";
import SkillComponent from "../../components/Skills/Skills"

import "./index.scss";
import ProjectHistoryComponent from "../../components/ProjectHistory/ProjectHistory";
import CertificationComponent from "../../components/Certifications/Certificates";

function CreateCV() {
  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email || "");

  if (!userDetails?.id) {
    return <p />;
  }

  const skills = userDetails.skills || [];


  return (
    <>
      <Container className="dashboard">
        <Grid stackable columns={2}>
          <Grid.Column width={5}>
            <AvatarCard />
            <TransitionablePortal
              closeOnTriggerClick
              openOnTriggerClick
              transition={{ animation: "fade left", duration: "500" }}
              trigger={<Button secondary content="Preview CV" />}
            >
              <Segment id="cv-preview-container">
                <CVPreview employee={userDetails} />
              </Segment>
            </TransitionablePortal>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Basic Info
                </Header>
                <BasicInfo userDetails={userDetails} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Bio Description
                </Header>
                <BioForm bio={userDetails?.bio} userId={userDetails?.id} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Links
                </Header>
                {userDetails && <Socials userDetails={userDetails} />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
              <Header dividing as="h3">
                Project History
              </Header>
              <ProjectHistoryComponent
                projectHistory={userDetails?.projects}
                userId={userDetails.id}
               />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
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
                <Header dividing as="h3">
                  Educations
                </Header>
                <Education
                  education={userDetails?.education}
                  userId={userDetails?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                <Divider hidden />
                  Competence
                </Header>
                <SkillComponent
                  userId={userDetails?.id} skills={skills}                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" dividing>
                <Divider hidden />
                  Certifications
                </Header>
                <CertificationComponent
                  userId={userDetails?.id} certifications={userDetails.certifications}                />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default CreateCV;
