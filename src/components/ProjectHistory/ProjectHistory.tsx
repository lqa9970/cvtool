import { Formik, Form } from 'formik';
import { FormikHandleChange, ProjectHistory } from '../../types/types';
import {
  Button,
  Grid,
  TextArea,
  Input,
  Checkbox,
  CheckboxProps
} from 'semantic-ui-react';
import { Header, Label, Icon } from 'semantic-ui-react';

import { useEffect, useState, MouseEvent } from 'react';
import useUpdateUser from '../../hooks/useUpdateUser';
import { uniqueIdGenerator } from '../../utils/uid';
import { initialValues, projectHistorySchema } from './ProjectHistoryUtils';
import './ProjectHistory.scss';
import CustomCalendar from '../Calendar/Calendar';
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

const EndDateComponent = (props: EndDateComponentProps) => {
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
      ></CustomCalendar>
    );
  }
};

const ProjectHistoryComponent = (props: ProjectHistoryProps) => {
  const [projectHistories, setProjectHistories] = useState<ProjectHistory[]>(
    []
  );
  const [updateUser] = useUpdateUser();

  const handleDelete = (id: string) => {
    const filteredProjects = props?.projectHistory?.filter(
      (obj) => obj.id !== id
    );
    setProjectHistories(filteredProjects!);
    updateUser({ projects: filteredProjects }, props.userId);
  };

  const handleFormikSubmit = (values: ProjectHistory) => {
    if (values.currentlyInProject) {
      values.endMonthYear = 'present';
    }
    const projects = props.projectHistory || [];
    projects.push({ ...values, id: uniqueIdGenerator() });
    setProjectHistories(projects);
    updateUser({ projects: projects }, props.userId);
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
        {projectHistories &&
          projectHistories.map((obj: ProjectHistory) => {
            return (
              <Grid.Row key={obj.id}>
                <Grid.Column id="project-card" width={14}>
                  <Header as="h3">{obj.role}</Header>
                  <span className="project-info-row">
                    <p>{obj.projectTitle}</p>
                    <i>{'Ac: ' + obj.accountName}</i>
                  </span>
                  <p id="industry">{obj.industry}</p>
                  <p id="duration">{`${obj.startMonthYear} - ${obj.endMonthYear}`}</p>
                  <p className="max-width-hidden">{obj.projectDescription}</p>
                </Grid.Column>
                <Grid.Column width={2} textAlign="right" verticalAlign="middle">
                  <Button icon circular id="delete-project">
                    <Icon onClick={() => handleDelete(obj.id)} name="delete" />
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
        onSubmit={(values, { resetForm }) => handleFormikSubmit(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid centered>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Input name="id" id="input-hidden" />
                  {showErrors(errors.id, touched.id)}
                  <Label id="form-labels">Role</Label>
                  <Input
                    value={values.role}
                    onChange={handleChange}
                    name="role"
                    fluid
                  />
                  {showErrors(errors.role, touched.role)}
                  <Label id="form-labels">Project Title</Label>
                  <Input
                    value={values.projectTitle}
                    onChange={handleChange}
                    name="projectTitle"
                    fluid
                  />
                  {showErrors(errors.projectTitle, touched.projectTitle)}
                </Grid.Column>
                <Grid.Column id="project-info-row">
                  <Label id="form-labels">Account Name</Label>
                  <Input
                    value={values.accountName}
                    onChange={handleChange}
                    name="accountName"
                  ></Input>
                  <Label id="form-labels">Industry</Label>
                  <Input
                    value={values.industry}
                    onChange={handleChange}
                    name="industry"
                  ></Input>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row id="no-padding-y">
                <Grid.Column>
                  <Label id="form-labels">Time Period</Label>
                  <Checkbox
                    id="currentlyInProject"
                    name="currentlyInProject"
                    checked={values.currentlyInProject}
                    onChange={handleChange}
                    label="Currently in project"
                  ></Checkbox>
                </Grid.Column>
              </Grid.Row>


              <Grid.Row>
                <Grid.Column>

                  <Label id="form-labels">From</Label>
                <div className='flex-container'>
                  <CustomCalendar
                    option="date"
                    name="startMonthYear"
                    value={values.startMonthYear}
                    setFieldValue={setFieldValue}
                    ></CustomCalendar>

                  {showErrors(errors.startMonthYear, touched.startMonthYear)}
                  <p id="yos-to">TO</p>
                  <EndDateComponent
                    value={values.endMonthYear}
                    placeholder="Month/Year"
                    name="endMonthYear"
                    setFieldValue={setFieldValue}
                    present={values.currentlyInProject}
                    ></EndDateComponent>
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
                    onChange={handleChange}
                    id="edu-text-area"
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
};

export default ProjectHistoryComponent;
