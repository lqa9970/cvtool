/* eslint-disable max-lines-per-function */
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
import { EmployeeUser, PdfOptions, PdfSingles } from "../../types/types";
import "./index.scss";

const options: PdfOptions = {
  singles: {
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
    workabroad: true,
    experience_level: true,
  },
  languages: [],
  tech_skills: [],
  projects: [],
  education: [],
  certifications: [],
};

function fillOptions(talent: EmployeeUser) {
  talent.languages?.forEach((x, index) => {
    options.languages[index] = true;
  });
  talent.tech_skills?.forEach((x, index) => {
    options.tech_skills[index] = true;
  });
  talent.projects?.forEach((x, index) => {
    options.projects[index] = true;
  });
  talent.education?.forEach((x, index) => {
    options.education[index] = true;
  });
  talent.certifications?.forEach((x, index) => {
    options.certifications[index] = true;
  });
}

function CVPdf() {
  const talent = useUserByEmail("markus.helminen@nordcloud.com");
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(options);

  if (talent[0] !== null) {
    fillOptions(talent[0]);
  }

  const handleOnChangeSingle = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.singles[event.target.id as keyof PdfSingles] =
        data.value === "on" ? false : true;
      return prev;
    });
  };
  const handleOnChangeLanguages = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.languages[parseInt(event.target.id.slice(-1), 10)] =
        data.value === "on" ? false : true;
      return prev;
    });
  };
  const handleOnChangeTechSkills = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.tech_skills[parseInt(event.target.id.slice(-1), 10)] =
        data.value === "on" ? false : true;
      return prev;
    });
  };
  const handleOnChangeProjects = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.projects[parseInt(event.target.id.slice(-1), 10)] =
        data.value === "on" ? false : true;
      return prev;
    });
  };
  const handleOnChangeEducations = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.education[parseInt(event.target.id.slice(-1), 10)] =
        data.value === "on" ? false : true;
      return prev;
    });
  };
  const handleOnChangeCertifications = (
    event: ChangeEvent,
    data: InputOnChangeData
  ) => {
    setPdfOptions((prev) => {
      prev.certifications[parseInt(event.target.id.slice(-1), 10)] =
        data.value === "on" ? false : true;
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
                    onChange={handleOnChangeSingle}
                  />
                  <Label htmlFor="name">Name</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="phone"
                    id="phone"
                    onChange={handleOnChangeSingle}
                  />
                  <Label htmlFor="phone">Phone</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="email"
                    id="email"
                    onChange={handleOnChangeSingle}
                  />
                  <Label htmlFor="email">Email</Label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="checkbox"
                    name="location"
                    id="location"
                    onChange={handleOnChangeSingle}
                  />
                  <Label htmlFor="email">Location</Label>
                </Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Tech Skills</Header>
                {talent[0]?.tech_skills?.map((skill, index) => {
                  return (
                    <Grid.Column key={skill.id}>
                      <Input
                        type="checkbox"
                        name={skill.name}
                        id={`${skill.name}-${index}`}
                        onChange={handleOnChangeTechSkills}
                      />
                      <Label htmlFor={skill.name}>{skill.name}</Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Certfications</Header>
                {talent[0]?.certifications?.map((certification, index) => {
                  return (
                    <Grid.Column key={certification.id}>
                      <Input
                        type="checkbox"
                        name={certification.name}
                        id={`${certification.name}-${index}`}
                        onChange={handleOnChangeCertifications}
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
                {talent[0]?.education?.map((education, index) => {
                  return (
                    <Grid.Column key={education.id}>
                      <Input
                        type="checkbox"
                        name={education.degree}
                        id={`${education.degree}-${index}`}
                        onChange={handleOnChangeEducations}
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
                {talent[0]?.languages?.map((language, index) => {
                  return (
                    <Grid.Column key={language.name}>
                      <Input
                        type="checkbox"
                        name={language.name}
                        id={`${language.name}-${index}`}
                        onChange={handleOnChangeLanguages}
                      />
                      <Label htmlFor={language.name}>{language.name}</Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Experience</Header>
                {talent[0]?.projects?.map((project, index) => {
                  return (
                    <Grid.Column key={project.id}>
                      <Input
                        type="checkbox"
                        name={project.projectTitle}
                        id={`${project.projectTitle}-${index}`}
                        onChange={handleOnChangeProjects}
                      />
                      <Label htmlFor={project.projectTitle}>
                        {project.projectTitle}
                      </Label>
                    </Grid.Column>
                  );
                })}
              </Grid.Column>
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
