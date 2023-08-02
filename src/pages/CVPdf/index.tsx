import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Input,
  InputOnChangeData,
  Label,
} from "semantic-ui-react";
import useUserByEmail from "../../hooks/useUserByEmail";
import { PdfOptions } from "../../types/types";
import "./index.scss";

const options = {
  name: true,
  email: true,
  location: true,
  job_title: true,
  manager_name: true,
  manager_email: true,
  nationality: true,
  main_tech: true,
  phone_number: true,
  social_links: true,
  bio: true,
  languages: true,
  skills: true,
  workabroad: true,
  experience_level: true,
  projects: true,
  education: true,
  certifications: true,
};

function CVPdf() {
  const talent = useUserByEmail("markus.helminen@nordcloud.com");
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(options);

  const handleOnChange = (event: ChangeEvent, data: InputOnChangeData) => {
    console.log(data);
    setPdfOptions((prev) => {
      prev[event.target.id as keyof PdfOptions] =
        data.value === "on" ? false : true;
      console.log(prev);
      return prev;
    });
  };

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h2">Hide fields</Header>
            <Grid.Row>
              <Grid.Column>
                <Header as="h4">Basic</Header>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="name"
                    id="name"
                    onChange={handleOnChange}
                  />
                  <Label htmlFor="name">Name</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="phone"
                    id="phone"
                    onChange={handleOnChange}
                  />
                  <Label htmlFor="phone">Phone</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="email"
                    id="email"
                    onChange={handleOnChange}
                  />
                  <Label htmlFor="email">Email</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="location"
                    id="location"
                    onChange={handleOnChange}
                  />
                  <Label htmlFor="email">Location</Label>
                </Grid.Column>
              </Grid.Column>
              {/* <Grid.Column>
                <Header as="h4">Tech Skills</Header>
                {talent[0]?.tech_skills?.map((skill) => {
                  return (
                    <Grid.Column key={skill.id}>
                      <Input
                        type="checkbox"
                        name={skill.name}
                        id={skill.name}
                        onChange={handleOnChange}
                      />
                      <Label htmlFor={skill.name}>{skill.name}</Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Certfications</Header>
                {talent[0]?.certifications?.map((certification) => {
                  return (
                    <Grid.Column key={certification.id}>
                      <Input
                        type="checkbox"
                        name={certification.name}
                        id={certification.name}
                        onChange={handleOnChange}
                      />
                      <Label htmlFor={certification.name}>
                        {certification.name}
                      </Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Education</Header>
                {talent[0]?.education?.map((education) => {
                  return (
                    <Grid.Column key={education.id}>
                      <Input
                        type="checkbox"
                        name={education.degree}
                        id={education.degree}
                        onChange={handleOnChange}
                      />
                      <Label htmlFor={education.degree}>
                        {education.degree}
                      </Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Languages</Header>
                {talent[0]?.languages?.map((language) => {
                  return (
                    <Grid.Column key={language.name}>
                      <Input
                        type="checkbox"
                        name={language.name}
                        id={language.name}
                        onChange={handleOnChange}
                      />
                      <Label htmlFor={language.name}>{language.name}</Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Experience</Header>
                {talent[0]?.projects?.map((project) => {
                  return (
                    <Grid.Column key={project.id}>
                      <Input
                        type="checkbox"
                        name={project.projectTitle}
                        id={project.projectTitle}
                        onChange={handleOnChange}
                      />
                      <Label htmlFor={project.projectTitle}>
                        {project.projectTitle}
                      </Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column> */}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link
                  to="/pdfpreview"
                  state={{ options: pdfOptions, talent: talent[0] }}
                >
                  <Button>Preview the pdf</Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default CVPdf;
