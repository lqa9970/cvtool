import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Grid,
  TextArea,
  Input,
  Checkbox,
  Header,
  Label,
  Icon,
} from "semantic-ui-react";

import useUpdateUser from "../../hooks/useUpdateUser";
import { ProjectHistory } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";
import CustomCalendar from "../Calendar/Calendar";
import { initialValues, projectHistorySchema } from "./ProjectHistoryUtils";
import "./ProjectHistory.scss";

type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

type ProjectHistoryProps = {
  projectHistory: ProjectHistory[] | undefined;
  userId: string;
};

type EndDateComponentProps = {
  present: boolean;
  value: string;
  name: string;
  placeholder: string;
  setFieldValue: SetFieldValue;
};

function EndDateComponent(props: EndDateComponentProps) {
  if (props.present) {
    return (
      <div className="center-child">
        <strong>Present</strong>
      </div>
    );
  } else {
    return (
      <CustomCalendar
        option="date"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        setFieldValue={props.setFieldValue}
      />
    );
  }
}

function ProjectHistoryComponent(props: ProjectHistoryProps) {
  const [projectHistories, setProjectHistories] = useState<ProjectHistory[]>(
    []
  );
  const [updateUser] = useUpdateUser();

  const handleDelete = async (id: string) => {
    const filteredProjects =
      props?.projectHistory?.filter((object) => object.id !== id) ?? [];
    setProjectHistories(filteredProjects);
    await updateUser({ projects: filteredProjects }, props.userId);
  };

  const handleFormikSubmit = async (values: ProjectHistory) => {
    if (values.currentlyInProject) {
      values.endMonthYear = "present";
    }
    const projects = props.projectHistory || [];
    projects.push({ ...values, id: uniqueIdGenerator() });
    setProjectHistories(projects);
    await updateUser({ projects }, props.userId);
  };

  const showErrors = (
    error: string | undefined,
    touched: boolean | undefined
  ) => {
    if (error && touched) {
      return (
        <Label basic color="red" pointing="above">
          {error}
        </Label>
      );
    }
  };

  useEffect(() => {
    setProjectHistories(props.projectHistory!);
  }, []);

  return (
    <Grid.Column>
      <Grid>
        {projectHistories?.map((object: ProjectHistory) => {
          return (
            <Grid.Row key={object.id}>
              <Grid.Column id="project-card" width={14}>
                <Header as="h3">{object.role}</Header>
                <span className="project-info-row">
                  <p>{object.projectTitle}</p>
                  <i>{"Ac: " + object.accountName}</i>
                </span>
                <p id="industry">{object.industry}</p>
                <p id="duration">{`${object.startMonthYear} - ${object.endMonthYear}`}</p>
                <p className="max-width-hidden">{object.projectDescription}</p>
              </Grid.Column>
              <Grid.Column width={2} textAlign="right" verticalAlign="middle">
                <Button icon circular id="delete-project">
                  <Icon name="delete" onClick={() => handleDelete(object.id)} />
                </Button>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
      <Header id="no-bottom-margin" as="h3">
        Add a new project
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={projectHistorySchema}
        onSubmit={(values) => handleFormikSubmit(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid centered>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Input name="id" id="input-hidden" />
                  {showErrors(errors.id, touched.id)}
                  <Label id="form-labels">Role</Label>
                  <Input
                    fluid
                    value={values.role}
                    name="role"
                    onChange={handleChange}
                  />
                  {showErrors(errors.role, touched.role)}
                  <Label id="form-labels">Project Title</Label>
                  <Input
                    fluid
                    value={values.projectTitle}
                    name="projectTitle"
                    onChange={handleChange}
                  />
                  {showErrors(errors.projectTitle, touched.projectTitle)}
                </Grid.Column>
                <Grid.Column id="project-info-row">
                  <Label id="form-labels">Account Name</Label>
                  <Input
                    value={values.accountName}
                    name="accountName"
                    onChange={handleChange}
                  />
                  <Label id="form-labels">Industry</Label>
                  <Input
                    value={values.industry}
                    name="industry"
                    onChange={handleChange}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row id="no-padding-y">
                <Grid.Column>
                  <Label id="form-labels">Time Period</Label>
                  <Checkbox
                    id="currentlyInProject"
                    name="currentlyInProject"
                    checked={values.currentlyInProject}
                    label="Currently in project"
                    onChange={handleChange}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">From</Label>
                  <div className="flex-container">
                    <CustomCalendar
                      option="date"
                      name="startMonthYear"
                      value={values.startMonthYear}
                      setFieldValue={setFieldValue}
                    />

                    {showErrors(errors.startMonthYear, touched.startMonthYear)}
                    <p id="yos-to">TO</p>
                    <EndDateComponent
                      value={values.endMonthYear}
                      placeholder="Month/Year"
                      name="endMonthYear"
                      setFieldValue={setFieldValue}
                      present={values.currentlyInProject}
                    />
                    {showErrors(errors.endMonthYear, touched.endMonthYear)}
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <TextArea
                    name="projectDescription"
                    placeholder="Enter your description here..."
                    value={values.projectDescription}
                    id="edu-text-area"
                    onChange={handleChange}
                  />
                  {showErrors(
                    errors.projectDescription,
                    touched.projectDescription
                  )}
                  <Button id="edu-add-button" type="submit">
                    Add
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid.Column>
  );
}

export default ProjectHistoryComponent;
