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
import CertificationComponent from "../../components/Certifications/Certifications";
import Education from "../../components/Education/Education";
import AvatarCard from "../../components/FormAvatarCard/AvatarCard";
import LanguagesSelect from "../../components/LanguagesSelect/LanguagesSelect";
import ProjectHistoryComponent from "../../components/ProjectHistory/ProjectHistory";
import SkillComponent from "../../components/Skills/Skills";
import Socials from "../../components/Socials/Socials";
import { useUserContext } from "../../context/UserContext";
import CVPreview from "../CVPreview";


import "./index.scss";

function CreateCV() {
  const { user } = useUserContext()
  if (!user?.id) {
    return <p />;
  }

  const techSkills = user.tech_skills || [];

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
                <CVPreview employee={user} />
              </Segment>
            </TransitionablePortal>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Basic Info
                </Header>
                <BasicInfo userDetails={user} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Bio Description
                </Header>
                <BioForm bio={user?.bio} userId={user?.id} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Links
                </Header>
                {user && <Socials userDetails={user} />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Project History
                </Header>
                <ProjectHistoryComponent
                  projectHistory={user?.projects}
                  userId={user.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Language Skills
                </Header>
                <LanguagesSelect
                  profileLanguages={user?.languages}
                  userId={user?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  Educations
                </Header>
                <Education
                  education={user?.education}
                  userId={user?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                  <Divider hidden />
                  Competence
                </Header>
                <SkillComponent
                  userId={user?.id} tech_skills={techSkills}                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header dividing as="h3">
                <Divider hidden />
                  Certifications
                </Header>
                <CertificationComponent
                  userId={user?.id} certifications={user?.certifications}                />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default CreateCV;
