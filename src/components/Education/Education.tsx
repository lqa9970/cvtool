import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Grid, Input, Header, Label, Icon } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import { Education } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";
import "./Education.scss";
import CustomCalendar from "../Calendar/Calendar";
import TextAreaInput from "../TextAreaInput/TextArea";
import { educationSchema, formatDate, initialValues } from "./EducationUtils";

type EducationProps = {
  education: Education[] | undefined;
  userId: string;
};

type SetFieldValue = (
  field: string,
  value: unknown,
  shouldValidate?: boolean | undefined
) => void;

function EducationComponent(props: EducationProps) {
  const [updateUser] = useUpdateUser();
  const [_openStartDatePick, setOpenStartDatePick] = useState(false);
  const [_openEndDatePick, setOpenEndDatePick] = useState(false);
  const [education, setEducation] = useState<Education[]>(
    props.education ?? []
  );
  const [isCharLimitExceeded, setIsCharLimitExceeded] = useState(false);

  const _handleStartDateSelect = (date: Date, setFieldValue: SetFieldValue) => {
    setFieldValue("startMonthYear", formatDate(date));
    setOpenStartDatePick(false);
  };

  const _handleEndDateSelect = (date: Date, setFieldValue: SetFieldValue) => {
    setFieldValue("endMonthYear", formatDate(date));
    setOpenEndDatePick(false);
  };

  const handleDelete = async (id: string) => {
    const filteredDegrees =
      education.filter((object) => object.id !== id) ?? [];
    setEducation(filteredDegrees);
    await updateUser({ education: filteredDegrees }, props.userId);
  };

  const handleFormikSubmit = async (values: Education) => {
    const degrees = education || [];
    degrees.push({ ...values, id: uniqueIdGenerator() });
    setEducation(degrees);
    await updateUser({ education: degrees }, props.userId);
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
      <Formik
        initialValues={initialValues}
        validationSchema={educationSchema}
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
            <Grid>
              <Grid.Row columns={1}>
                <Input name="id" id="input-hidden" />
                <Grid.Column width={9}>
                  {showErrors(errors.id, touched.id)}
                </Grid.Column>
                <Grid.Column>
                  <Label id="form-labels">Institution</Label>
                  <Input
                    fluid
                    value={values.school}
                    placeholder="Institution"
                    name="school"
                    onChange={handleChange}
                  />
                  {showErrors(errors.school, touched.school)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Degree</Label>
                  <Input
                    fluid
                    value={values.degree}
                    placeholder="Degree"
                    name="degree"
                    onChange={handleChange}
                  />
                  {showErrors(errors.degree, touched.degree)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Year of Study</Label>
                  <div className="flex-container">
                    <CustomCalendar
                      name="startMonthYear"
                      option="date"
                      placeholder="Month/Year"
                      setFieldValue={setFieldValue}
                      value={values.startMonthYear}
                    />

                    {showErrors(errors.startMonthYear, touched.startMonthYear)}
                    <p id="yos-to">TO</p>
                    <CustomCalendar
                      name="endMonthYear"
                      option="date"
                      placeholder="Month/Year"
                      setFieldValue={setFieldValue}
                      value={values.endMonthYear}
                    />
                    {showErrors(errors.endMonthYear, touched.endMonthYear)}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Label id="form-labels">Description</Label>
                  {/* <TextAreaInput
                    name="degreeDescription"
                    placeholder="Enter your description here..."
                    value={values.degreeDescription}
                    handleChange={handleChange}
                    id="edu-text-area"
                  /> */}
                  <TextAreaInput
                    id="edu-text-area"
                    value={values.degreeDescription}
                    name="degreeDescription"
                    placeholder="Enter your bio here"
                    handleChange={handleChange}
                    onExceedLimit={setIsCharLimitExceeded}
                    characterLimit={1250}
                  />
                  {showErrors(
                    errors.degreeDescription,
                    touched.degreeDescription
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row id="edu-button-row">
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
          </Form>
        )}
      </Formik>
      {education.length > 0 && (
        <Grid columns={3} textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">Institution</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">Degree</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">Date</Header>
            </Grid.Column>
          </Grid.Row>
          {education.map((object: Education) => {
            return (
              <Grid.Row key={object.id}>
                <Grid.Column>
                  <p>{object.school}</p>
                </Grid.Column>
                <Grid.Column>
                  <p>{object.degree}</p>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column width={10}>
                        <p>{`${object.startMonthYear} - ${object.endMonthYear}`}</p>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Button
                          icon
                          circular
                          id="edu-delete-button"
                          onClick={() => handleDelete(object.id)}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      )}
    </Grid.Column>
  );
}

export default EducationComponent;
