import { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid, Input, Header, Label, Icon } from "semantic-ui-react";
import { Datepicker, DayPicker } from "@nordcloud/gnui";
import useUpdateUser from "../../hooks/useUpdateUser";
import { Education } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";
import "./Education.scss";
import TextAreaInput from "../TextAreaInput/TextArea";
import {
  educationSchema,
  defaultStartDate,
  formatDate,
  initialValues,
  defaultEndDate,
} from "./EducationUtils";

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
  const [openStartDatePick, setOpenStartDatePick] = useState(false);
  const [openEndDatePick, setOpenEndDatePick] = useState(false);

  const handleStartDateSelect = (date: Date, setFieldValue: SetFieldValue) => {
    setFieldValue("startMonthYear", formatDate(date));
    setOpenStartDatePick(false);
  };

  const handleEndDateSelect = (date: Date, setFieldValue: SetFieldValue) => {
    setFieldValue("endMonthYear", formatDate(date));
    setOpenEndDatePick(false);
  };

  const handleDelete = (id: string) => {
    const deleteDegree = props?.education?.filter((object) => object.id !== id);
    updateUser({ education: deleteDegree }, props.userId)
      .then(() => null)
      .catch(() => null);
  };

  const handleFormikSubmit = (values: Education) => {
    const degrees = props.education || [];
    degrees.push({ ...values, id: uniqueIdGenerator() });
    updateUser({ education: degrees }, props.userId)
      .then(() => null)
      .catch(() => null);
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
                    <Input
                      value={values.startMonthYear}
                      placeholder="Month/Year"
                      name="startMonthYear"
                      onChange={handleChange}
                      onClick={() => setOpenStartDatePick(true)}
                    />
                    {openStartDatePick ? (
                      <Datepicker id="date-picker">
                        <DayPicker
                          mode="single"
                          onSelect={(date) =>
                            handleStartDateSelect(
                              date || defaultStartDate,
                              setFieldValue
                            )
                          }
                        />
                      </Datepicker>
                    ) : null}
                    {showErrors(errors.startMonthYear, touched.startMonthYear)}
                    <p id="yos-to">TO</p>
                    <Input
                      value={values.endMonthYear}
                      placeholder="Month/Year"
                      name="endMonthYear"
                      onChange={handleChange}
                      onClick={() => setOpenEndDatePick(true)}
                    />
                    {openEndDatePick ? (
                      <Datepicker id="date-picker">
                        <DayPicker
                          mode="single"
                          onSelect={(date) =>
                            handleEndDateSelect(
                              date || defaultEndDate,
                              setFieldValue
                            )
                          }
                        />
                      </Datepicker>
                    ) : null}
                    {showErrors(errors.endMonthYear, touched.endMonthYear)}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Label id="form-labels">Description</Label>
                  <TextAreaInput
                    name="degreeDescription"
                    placeholder="Enter your description here..."
                    value={values.degreeDescription}
                    handleChange={handleChange}
                    id="edu-text-area"
                  />
                  {showErrors(
                    errors.degreeDescription,
                    touched.degreeDescription
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row id="edu-button-row">
                <Grid.Column>
                  <Button id="edu-add-button" type="submit">
                    Add
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
      {props.education?.toString() !== "" && (
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
          {props.education?.map((obj: Education) => {
            return (
              <Grid.Row key={obj.id}>
                <Grid.Column>
                  <p>{obj.school}</p>
                </Grid.Column>
                <Grid.Column>
                  <p>{obj.degree}</p>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column width={10}>
                        <p>{`${obj.startMonthYear} - ${obj.endMonthYear}`}</p>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Icon
                          onClick={() => handleDelete(obj.id)}
                          style={{ color: "#161632" }}
                          name="delete"
                          circular
                        />
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
