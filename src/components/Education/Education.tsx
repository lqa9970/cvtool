import { Formik, Form } from 'formik';
import { Education } from '../../types/types';
import { Button, Grid, TextArea, Input, GridColumn } from 'semantic-ui-react';
import { Header, Label, Icon } from 'semantic-ui-react';
import { Datepicker, DayPicker } from '@nordcloud/gnui';
import { useState } from 'react';
import { educationSchema, defaultStartDate } from './EducationUtils';
import { formatDate, initialValues, defaultEndDate } from './EducationUtils';
import useUpdateUser from '../../hooks/useUpdateUser';
import { uniqueIdGenerator } from '../../utils/uid';
import './Education.scss';

type EducationProps = {
  education: Education[] | undefined;
  userId: string;
};

type setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

const EducationComponent = (props: EducationProps) => {
  const [updateUser] = useUpdateUser();
  const [openStartDatePick, setOpenStartDatePick] = useState(false);
  const [openEndDatePick, setOpenEndDatePick] = useState(false);

  const handleStartDateSelect = (date: Date, setFieldValue: setFieldValue) => {
    setFieldValue('startMonthYear', formatDate(date));
    setOpenStartDatePick(false);
  };

  const handleEndDateSelect = (date: Date, setFieldValue: setFieldValue) => {
    setFieldValue('endMonthYear', formatDate(date));
    setOpenEndDatePick(false);
  };

  const handleDelete = (id: string) => {
    const deleteDegree = props?.education?.filter((obj) => obj.id != id);
    updateUser({ education: deleteDegree }, props.userId);
  };

  const handleFormikSubmit = (values: Education) => {
    const degrees = props.education || [];
    degrees.push({ ...values, id: uniqueIdGenerator() });
    updateUser({ education: degrees }, props.userId);
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
            <Grid>
              <Grid.Row columns={1}>
                <Input name="id" id="input-hidden" />
                <Grid.Column width={9}>
                  {showErrors(errors.id, touched.id)}
                </Grid.Column>

                <Grid.Column>
                  <Label id="form-labels">Institution</Label>
                  <Input
                    value={values.school}
                    onChange={handleChange}
                    placeholder="Institution"
                    name="institution"
                    fluid
                  />
                  {showErrors(errors.school, touched.school)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Degree</Label>
                  <Input
                    value={values.degree}
                    onChange={handleChange}
                    placeholder="Degree"
                    name="degree"
                    fluid
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
                      onChange={handleChange}
                      placeholder="Month/Year"
                      name="startMonthYear"
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
                      onChange={handleChange}
                      placeholder="Month/Year"
                      name="endMonthYear"
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
                  <Label id="form-labels">Personal Description</Label>
                  <TextArea
                    name="degreeDescription"
                    placeholder="Enter your description here..."
                    value={values.degreeDescription}
                    onChange={handleChange}
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
        {props.education &&
          props.education.map((obj: Education, i: number) => {
            return (
              <Grid.Row>
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
                          color="orange"
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
    </Grid.Column>
  );
};

export default EducationComponent;
