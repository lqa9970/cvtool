/* eslint-disable import/max-dependencies */
import { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Grid,
  Input,
  Checkbox,
  Header,
  Label,
} from "semantic-ui-react";

import "./ProjectHistory.scss";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useUpdateUser from "../../hooks/useUpdateUser";
import { Industry, ProjectHistory } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";
import CustomCalendar from "../Calendar/Calendar";
import BasicDropdown from "../Dropdown/BasicDropdown";
import TextAreaInput from "../TextAreaInput/TextArea";
import ProjectCards from "./ProjectCards/ProjectCards";
import { initialValues, projectHistorySchema } from "./ProjectHistoryUtils";
import ProjectSkills from "./ProjectSkills/ProjectSkills";

type SetFieldValue = (
  field: string,
  value: number[] | string[] | number | string,
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
  const [isCharLimitExceeded, setIsCharLimitExceeded] = useState(false);
  const [projectHistories, setProjectHistories] = useState<ProjectHistory[]>(
    props.projectHistory || []
  );
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [updateUser] = useUpdateUser();

  const industries = useGetFirestoreCollection({
    collection: "industries",
  }).data as Industry[];

  const industriesOptions = industries.map((industry) => ({
    key: industry.id,
    value: industry.name,
    text: industry.name,
  }));

  const formik = useFormik<ProjectHistory>({
    initialValues,
    validationSchema: projectHistorySchema,
    onSubmit: async (values) => {
      formik.resetForm();
      setTriggerReset((prev) => !prev);
      if (values.currentlyInProject) {
        values.endMonthYear = "present";
      }
      const projects = projectHistories || [];
      projects.push({ ...values, id: uniqueIdGenerator() });
      projects.sort((a, b) =>
        b.endMonthYear.slice(-4).localeCompare(a.endMonthYear.slice(-4))
      );
      setProjectHistories(projects);
      await updateUser({ projects }, props.userId);
    },
  });

  const handleDelete = async (id: string) => {
    const filteredProjects =
      projectHistories.filter((object) => object.id !== id) ?? [];
    setProjectHistories(filteredProjects);
    await updateUser({ projects: filteredProjects }, props.userId);
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

  return (
    <Grid.Column>
      <ProjectCards
        projectHistory={projectHistories}
        handleDelete={handleDelete}
      />
      <Header id="no-bottom-margin" as="h3">
        Add a new project
      </Header>
      <form onSubmit={formik.handleSubmit}>
        <Grid centered>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Input name="id" id="input-hidden" />
              {showErrors(formik.errors.id, formik.touched.id)}
              <Label id="form-labels">Role</Label>
              <Input
                fluid
                value={formik.values.role}
                name="role"
                onChange={formik.handleChange}
              />
              {showErrors(formik.errors.role, formik.touched.role)}
              <Label id="form-labels">Project Title</Label>
              <Input
                fluid
                value={formik.values.projectTitle}
                name="projectTitle"
                onChange={formik.handleChange}
              />
              {showErrors(
                formik.errors.projectTitle,
                formik.touched.projectTitle
              )}
            </Grid.Column>
            <Grid.Column>
              <Label id="form-labels">Account Name</Label>
              <Input
                value={formik.values.accountName}
                name="accountName"
                onChange={formik.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Label id="form-labels">Industry</Label>
              <BasicDropdown
                options={industriesOptions}
                fieldName="industry"
                value={formik.values.industry}
                setFieldValue={formik.setFieldValue}
                reset={triggerReset}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row id="no-padding-y">
            <Grid.Column>
              <Label id="form-labels">Time Period</Label>
              <Checkbox
                id="currentlyInProject"
                name="currentlyInProject"
                checked={formik.values.currentlyInProject}
                label="Currently in project"
                onChange={formik.handleChange}
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
                  value={formik.values.startMonthYear}
                  setFieldValue={formik.setFieldValue}
                />

                {showErrors(
                  formik.errors.startMonthYear,
                  formik.touched.startMonthYear
                )}
                <p id="yos-to">TO</p>
                <EndDateComponent
                  value={formik.values.endMonthYear}
                  placeholder="Month/Year"
                  name="endMonthYear"
                  setFieldValue={formik.setFieldValue}
                  present={formik.values.currentlyInProject}
                />
                {showErrors(
                  formik.errors.endMonthYear,
                  formik.touched.endMonthYear
                )}
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <TextAreaInput
                id="edu-text-area"
                value={formik.values.projectDescription}
                name="projectDescription"
                placeholder="Enter your description here..."
                handleChange={formik.handleChange}
                characterLimit={2500}
                onExceedLimit={setIsCharLimitExceeded}
              />
              {showErrors(
                formik.errors.projectDescription,
                formik.touched.projectDescription
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ProjectSkills
                addSkill={formik.setFieldValue}
                resetSkills={triggerReset}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                id="edu-add-button"
                type="submit"
                disabled={isCharLimitExceeded}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
    </Grid.Column>
  );
}

export default ProjectHistoryComponent;
