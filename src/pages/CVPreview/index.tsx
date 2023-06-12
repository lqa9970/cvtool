import { Container, Grid, Header, Label, Icon , Image, Divider, List } from 'semantic-ui-react';
import CloudLogo from '../../assets/cloud-logo.png';
import Ninja from '../../assets/ninja.png';
import { EmployeeUser } from '../../types/types';

import './index.scss';

type IEmployee = {
  employee: EmployeeUser;
}

function CVPreview({ employee }: IEmployee) {

  if (!employee || !employee.id) {return null;}

  return (
    <Container id="cv-preview">
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={6} id="preview-left-col">
            <Image fluid src={CloudLogo} id="preview-logo" />
            <Image fluid src={Ninja} id="preview-ninja" />
            {employee.languages && (
              <>
                <Divider horizontal>
                  <Header as="h3" id="preview-left-col-header">
                    LANGUAGES
                  </Header>
                </Divider>
                <Container>
                  <List bulleted id="preview-list">
                    {employee.languages.map((lang) => (
                      <List.Item id="preview-list-item">
                        {lang.name} - {lang.proficiency}
                      </List.Item>
                    ))}
                  </List>
                </Container>
              </>
            )}

            {employee.education && (
              <>
                <Divider horizontal>
                  <Header as="h3" id="preview-left-col-header">
                    EDUCATIONS
                  </Header>
                </Divider>
                <List bulleted id="preview-list">
                  {employee.education?.map((edu) => (
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

            {employee.certifications && (
              <>
                <Divider horizontal>
                  <Header as="h3" id="preview-left-col-header">
                    CERTIFICATIONS
                  </Header>
                </Divider>
                <List bulleted id="preview-list">
                  {employee.certifications?.map((certificate) => (
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

            {employee.main_tech && (
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

            {employee.skills && (
              <>
                <Divider horizontal>
                  <Header as="h3" id="preview-left-col-header">
                    SKILLS
                  </Header>
                </Divider>
                <Label.Group size="medium">
                  {employee.skills.map((skill) => (
                    <Label>{skill.name}</Label>
                  ))}
                </Label.Group>
              </>
            )}

            {employee.skills && (
              <>
                <Divider horizontal>
                  <Header as="h3" id="preview-left-col-header">
                    COMPETENCIES
                  </Header>
                </Divider>
                <Label.Group size="medium">
                  {employee.skills.map((skill) => (
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
                  <Header as="h1">{employee.name}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">{employee.job_title}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>
                  <div>{employee?.location}</div>
                  <div>{employee?.email}</div>
                  <div>{employee?.phone_number}</div>
                  <div>
                    <b>Nationality:</b> {employee?.nationality}
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <div>
                    <b>Manager:</b> {employee?.manager_name}
                  </div>
                  <div>
                    <b>Contact:</b> {employee?.manager_email}
                  </div>
                </Grid.Column>
              </Grid.Row>
              {employee.social_links && (
                <Grid.Row>
                  <Grid.Column width={16}>
                    {employee.social_links.github && (
                      <div>
                        <Icon name="github" />
                        {employee.social_links.github}
                      </div>
                    )}
                    {employee.social_links.linkedin && (
                      <div>
                        <Icon name="linkedin" />
                        {employee.social_links.linkedin}
                      </div>
                    )}
                    {employee.social_links.website && (
                      <div>
                        <Icon name="globe" />
                        {employee.social_links.website}
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
              )}
              <Divider section />
            </Grid>
            <Container>
              {employee?.bio || 'Write a few words here about yourself here'}
            </Container>
            <Divider section />
            <Header as="h3">PROJECT EXPERIENCE</Header>
            <Divider section />
            {employee.projects?.map((project) => (
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
}

export default CVPreview;
