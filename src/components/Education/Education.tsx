import React from 'react';
import { Formik, Form } from 'formik';
import { Education } from '../../types/types';
import { Button, Grid, TextArea, Input } from 'semantic-ui-react';
import { Header, Label, Icon } from 'semantic-ui-react';
import { Datepicker, DayPicker } from '@nordcloud/gnui';
import { useState } from 'react';
import { educationSchema, defaultStartDate, uniqueIdGenerator } from './EducationUtils';
import { formatDate, initialValues, defaultEndDate } from './EducationUtils';
import useUpdateUser from '../../hooks/useUpdateUser';
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
    console.log(values);
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
            <Grid centered>
              <Grid.Row columns={1}>
                <Grid.Column width={9}>
                  <Input name="id" id="input-hidden" />
                  {showErrors(errors.id, touched.id)}
                  <Label id="form-labels">School Name</Label>
                  <Input
                    value={values.school}
                    onChange={handleChange}
                    placeholder="School"
                    name="school"
                    fluid
                  />
                  {showErrors(errors.school, touched.school)}
                  <Label id="form-labels">Degree Name</Label>
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
                <Grid.Column width={9}>
                  <Label id="form-labels">Year of Study</Label>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={3}>
                <Grid.Column width={3}>
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
                </Grid.Column>
                <Grid.Column id="yos-to-grid" width={3} verticalAlign="middle">
                  <p id="yos-to">TO</p>
                </Grid.Column>
                <Grid.Column width={3}>
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
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={9}>
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
                  <Button id="edu-add-button" type="submit">
                    Add
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
      <Grid centered>
        {props.education &&
          props.education.map((obj: Education, i: number) => {
            return (
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header as="h4">{`${obj.degree} - ${obj.school}`}</Header>
                  <p>{`${obj.startMonthYear} - ${obj.endMonthYear}`}</p>
                </Grid.Column>
                <Grid.Column width={4} textAlign="right" verticalAlign="middle">
                  <Icon
                    onClick={() => handleDelete(obj.id)}
                    color="orange"
                    name="delete"
                    circular
                  />
                </Grid.Column>
              </Grid.Row>
            );
          })}
      </Grid>
    </Grid.Column>
  );
};

export default EducationComponent;
