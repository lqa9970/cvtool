/* eslint-disable import/max-dependencies */
import { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid, Input, Header, Label, Icon } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import { Education } from "../../types/types";
import { formatDate } from "../../utils/date";
import { uniqueIdGenerator } from "../../utils/uid";
import CustomCalendar from "../Calendar/Calendar";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../Submit/SubmitButton";
import TextAreaInput from "../TextAreaInput/TextArea";
import { educationSchema, initialValues } from "./EducationUtils";
import "./Education.scss";


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
        onSubmit={async (values, { resetForm }) => {
          await handleFormikSubmit(values);
          resetForm();
        }}
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
                  <CustomInput
                    fluid
                    required
                    label="Institution"
                    name="school"
                    charLimit={200}
                    />
                  <CustomInput
                    fluid
                    required
                    label="Degree"
                    name="degree"
                    charLimit={200}
                    />
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
              <SubmitButton label="Add"/>
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
