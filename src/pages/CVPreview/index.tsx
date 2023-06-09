import { Container, Grid, Header, Label, Icon } from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';
import useGetUser from '../../hooks/useGetUser';

import { Image, Divider, List } from 'semantic-ui-react';
import CloudLogo from '../../assets/cloud-logo.png';
import Ninja from '../../assets/ninja.png';

import './index.scss';

const CVPreview = () => {
  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email!);

  if (!userDetails || !userDetails.id) return null;

  return (
      <Container id="cv-preview">
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={6} id="preview-left-col">
              <Image src={CloudLogo} fluid id="preview-logo" />
              <Image src={Ninja} fluid id="preview-ninja" />
              {userDetails.languages && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      LANGUAGES
                    </Header>
                  </Divider>
                  <Container>
                    <List bulleted id="preview-list">
                      {userDetails.languages.map((lang) => (
                        <List.Item id="preview-list-item">
                          {lang.name} - {lang.proficiency}
                        </List.Item>
                      ))}
                    </List>
                  </Container>
                </>
              )}

              {userDetails.education && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      EDUCATIONS
                    </Header>
                  </Divider>
                  <List bulleted id="preview-list">
                    {userDetails.education?.map((edu) => (
                      <List.Item id="preview-list-item">
                        <List.Header id="preview-list-header">
                          {edu.degree}
                        </List.Header>
                        {edu.school}
                      </List.Item>
                    ))}
                  </List>
                </>
              )}

              {userDetails.certifications && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      CERTIFICATIONS
                    </Header>
                  </Divider>
                  <List bulleted id="preview-list">
                    {userDetails.certifications?.map((certificate) => (
                      <List.Item id="preview-list-item">
                        <List.Header id="preview-list-header">
                          {certificate.name}
                        </List.Header>
                        {certificate.date}
                      </List.Item>
                    ))}
                  </List>
                </>
              )}

              {userDetails.main_tech && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      MAIN TECH
                    </Header>
                  </Divider>
                  <Label.Group size="medium">
                    <Label>AWS</Label>
                  </Label.Group>
                </>
              )}

              {userDetails.skills && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      SKILLS
                    </Header>
                  </Divider>
                  <Label.Group size="medium">
                    {userDetails.skills.map((skill) => (
                      <Label>{skill.name}</Label>
                    ))}
                  </Label.Group>
                </>
              )}

              {userDetails.skills && (
                <>
                  <Divider horizontal>
                    <Header as="h3" id="preview-left-col-header">
                      COMPETENCIES
                    </Header>
                  </Divider>
                  <Label.Group size="medium">
                    {userDetails.skills.map((skill) => (
                      <Label>{skill.name}</Label>
                    ))}
                  </Label.Group>
                </>
              )}

              <Divider hidden />
            </Grid.Column>
            <Grid.Column width={10} id="preview-right-col">
              <Grid id="preview-right-col-container">
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h1">{userDetails.name}</Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h2">{userDetails.job_title}</Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={10}>
                    <div>{userDetails?.location}</div>
                    <div>{userDetails?.email}</div>
                    <div>{userDetails?.phone_number}</div>
                    <div>
                      <b>Nationality:</b> {userDetails?.nationality}
                    </div>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <div>
                      <b>Manager:</b> {userDetails?.manager_name}
                    </div>
                    <div>
                      <b>Contact:</b> {userDetails?.manager_email}
                    </div>
                  </Grid.Column>
                </Grid.Row>
                {userDetails.social_links && (
                  <Grid.Row>
                    <Grid.Column width={16}>
                      {userDetails.social_links.github && (
                        <div>
                          <Icon name="github" />
                          {userDetails.social_links.github}
                        </div>
                      )}
                      {userDetails.social_links.linkedin && (
                        <div>
                          <Icon name="linkedin" />
                          {userDetails.social_links.linkedin}
                        </div>
                      )}
                      {userDetails.social_links.website && (
                        <div>
                          <Icon name="globe" />
                          {userDetails.social_links.website}
                        </div>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                )}
                <Divider section />
              </Grid>
              <Container>
                {userDetails?.bio ||
                  'Write a few words here about yourself here'}
              </Container>
              <Divider section />
              <Header as="h3">PROJECT EXPERIENCE</Header>
              <Divider section />
              {userDetails.projects?.map((project) => (
                <List bulleted>
                  <List.Item>
                    <Header as="h3">{project.role}</Header>
                    <div style={{ paddingTop: '5px' }}>
                      {project.projectTitle}
                    </div>
                    <div
                      style={{ paddingTop: '5px' }}
                    >{`${project.startMonthYear} - ${project.endMonthYear}`}</div>
                    <div style={{ paddingTop: '5px' }}>{project.industry}</div>
                    <Container style={{ paddingTop: '15px' }}>
                      {project.projectDescription}
                    </Container>
                    <Divider section />
                  </List.Item>
                </List>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
  );
};

export default CVPreview;
