import { Field, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Header, Label } from "semantic-ui-react";
import useUserByEmail from "../../hooks/useUserByEmail";
import { PdfOptions } from "../../types/types";
import "./index.scss";

const options: PdfOptions = {
  name: true,
  email: true,
  location: false,
  job_title: false,
  manager_name: true,
  manager_email: true,
  nationality: true,
  main_tech: false,
  phone_number: true,
  social_links: false,
  bio: false,
  workabroad: false,
  experience_level: false,
  languages: [],
  tech_skills: [],
  projects: [],
  education: [],
  certifications: [],
  soft_skills: [],
};

function CVPdf() {
  const talent = useUserByEmail("markus.helminen@nordcloud.com");

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h2">Hide fields</Header>
            <Formik
              initialValues={options}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
              }}
            >
              {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h4">Basic</Header>
                      <Grid.Column>
                        <Field type="checkbox" name="name" />
                        <Label htmlFor="name">Name</Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Field type="checkbox" name="phone_number" />
                        <Label htmlFor="phone_number">Phone</Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Field type="checkbox" name="email" />
                        <Label htmlFor="email">Email</Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Field type="checkbox" name="location" />
                        <Label htmlFor="email">Location</Label>
                      </Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.tech_skills?.length &&
                        talent[0].tech_skills.length > 0 && (
                          <>
                            <Header as="h4">Tech skills</Header>
                            {talent[0]?.tech_skills?.map((skill) => {
                              return (
                                <Grid.Column key={skill.id}>
                                  <Field
                                    type="checkbox"
                                    name="tech_skills"
                                    value={skill.name}
                                  />
                                  <Label htmlFor={skill.name}>
                                    {skill.name}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.soft_skills?.length &&
                        talent[0].soft_skills.length > 0 && (
                          <>
                            <Header as="h4">Soft skills</Header>
                            {talent[0]?.soft_skills?.map((skill) => {
                              return (
                                <Grid.Column key={skill.id}>
                                  <Field
                                    type="checkbox"
                                    name="tech_skills"
                                    value={skill.name}
                                  />
                                  <Label htmlFor={skill.name}>
                                    {skill.name}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.certifications?.length &&
                        talent[0].certifications.length > 0 && (
                          <>
                            <Header as="h4">Certfications</Header>
                            {talent[0]?.certifications?.map((certification) => {
                              return (
                                <Grid.Column key={certification.id}>
                                  <Field
                                    type="checkbox"
                                    name="certifications"
                                    value={certification.name}
                                  />
                                  <Label htmlFor={certification.name}>
                                    {certification.name}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.education?.length &&
                        talent[0].education.length > 0 && (
                          <>
                            <Header as="h4">Education</Header>
                            {talent[0]?.education?.map((education) => {
                              return (
                                <Grid.Column key={education.id}>
                                  <Field
                                    type="checkbox"
                                    name="education"
                                    value={education.id}
                                  />
                                  <Label htmlFor="education">
                                    {education.degree}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.languages?.length &&
                        talent[0].languages.length > 0 && (
                          <>
                            <Header as="h4">Languages</Header>
                            {talent[0]?.languages?.map((language) => {
                              return (
                                <Grid.Column key={language.name}>
                                  <Field
                                    type="checkbox"
                                    name="languages"
                                    value={language.name}
                                  />
                                  <Label htmlFor={language.name}>
                                    {language.name}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                    <Grid.Column>
                      {talent[0]?.projects?.length &&
                        talent[0].projects.length > 0 && (
                          <>
                            <Header as="h4">Experience</Header>
                            {talent[0]?.projects?.map((project) => {
                              return (
                                <Grid.Column key={project.id}>
                                  <Field
                                    type="checkbox"
                                    name="projects"
                                    value={project.id}
                                  />
                                  <Label htmlFor={project.projectTitle}>
                                    {project.projectTitle +
                                      " : " +
                                      project.role}
                                  </Label>
                                </Grid.Column>
                              );
                            })}
                          </>
                        )}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Link
                        to="/pdfpreview"
                        state={{ options: values, talent: talent[0] }}
                      >
                        <Button type="submit">Preview the pdf</Button>
                      </Link>
                      <Button type="button" onClick={() => console.log(values)}>
                        Log
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </form>
              )}
            </Formik>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default CVPdf;
