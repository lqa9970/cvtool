import {
  faUser,
  faPen,
  faLink,
  faClockRotateLeft,
  faLanguage,
  faSchool,
  faScroll,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import CertificationComponent from "../../components/Certifications/Certifications";
import Education from "../../components/Education/Education";
import AvatarCard from "../../components/FormAvatarCard/AvatarCard";
import LanguagesSelect from "../../components/LanguagesSelect/LanguagesSelect";
import ProjectHistoryComponent from "../../components/ProjectHistory/ProjectHistory";
import SkillComponent from "../../components/Skills/Skills";
import Socials from "../../components/Socials/Socials";
import { useUserContext } from "../../context/UserContext";
import CVPreview from "../CVPreview";
// eslint-disable-next-line import/max-dependencies
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
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faUser} size="xs" /> Basic Info
                </Header>
                <BasicInfo userDetails={user} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faPen} size="xs" /> Bio Description
                </Header>
                <BioForm bio={user?.bio} userId={user?.id} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faLink} size="xs" /> Links
                </Header>
                {user && <Socials userDetails={user} />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faClockRotateLeft} size="xs" /> Project
                  History
                </Header>
                <ProjectHistoryComponent
                  projectHistory={user?.projects}
                  userId={user.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faLanguage} size="xs" /> Language
                  Skills
                </Header>
                <LanguagesSelect
                  profileLanguages={user?.languages}
                  userId={user?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <FontAwesomeIcon icon={faSchool} size="xs" /> Educations
                </Header>
                <Education
                  education={user?.education}
                  userId={user?.id}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <Divider hidden />
                  <FontAwesomeIcon icon={faLayerGroup} size="xs" /> Competence
                </Header>
                <SkillComponent
                  userId={userDetails?.id}
                  tech_skills={techSkills}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id="cv-info-row">
              <Grid.Column>
                <Header dividing as="h2">
                  <Divider hidden />
                  <FontAwesomeIcon icon={faScroll} size="xs" /> Certifications
                </Header>
                <CertificationComponent
                  userId={userDetails?.id}
                  certifications={userDetails?.certifications}
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
