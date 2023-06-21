import { Formik, Form, Field, FormikErrors } from 'formik';
import { Certifications } from '../../types/types';
import { Button, Grid, Dropdown } from 'semantic-ui-react';
import { Header, Label, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import useUpdateUser from '../../hooks/useUpdateUser';
import { uniqueIdGenerator } from '../../utils/uid';
import CustomCalendar from '../Calendar/Calendar';

import * as Yup from 'yup';
import useGetFirestoreCollection from '../../hooks/useGetCollectionData';

export const certificationSchema = Yup.object().shape({
  name: Yup.string().required('Certificate is required'),
  validFrom: Yup.date().required('Valid from date is required'),
  validTo: Yup.date().required('Valid to date is required'),
});

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};

type CertificationProps = {
  certifications: Certifications[] | undefined;
  userId: string;
};

const initialValues: Certifications = {
  name: '',
  validFrom: '',
  validTo: '',
  date: '', // Add the 'date' property here
};

function CertificationComponent(props: CertificationProps) {
  const { data, loading, error } = useGetFirestoreCollection({ collection: 'certification' });
  const [updateUser] = useUpdateUser();
  const certificateOptions = data.map((certificate: any) => ({
    key: certificate.id,
    value: certificate.name,
    text: certificate.name,
  }));

  const handleDelete = async (id: string) => {
    const deleteCertification = props.certifications?.filter((object) => object.id !== id);
    try {
      await updateUser({ certifications: deleteCertification }, props.userId)
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  const handleFormikSubmit = async (values: Certifications) => {
    const certifications = [...(props.certifications || [])];
    const newCertification = { ...values, id: values.id};
    certifications.push(newCertification);
    try {
      await updateUser({ certifications: certifications }, props.userId)
    } catch (error) {
      console.error('Error updating user certifications:', error);
    }
  };

  const showErrors = (
    error: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined,
    touched: boolean | undefined
  ) => {
    if (Array.isArray(error)) {
      error = error[0];
    } else if (typeof error === 'object' && error !== null) {
      error = Object.values(error)[0] as string;
    }

    if (error && touched) {
      return (
        <Label basic color="red" pointing="above">
          {String(error)}
        </Label>
      );
    }
  };

  return (
    <Grid.Column>
      <Formik
        initialValues={initialValues}
        validationSchema={certificationSchema}
        onSubmit={(values) => handleFormikSubmit(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Certificate</Label>
                  <Dropdown
                    fluid
                    selection
                    options={certificateOptions}
                    name="name"
                    onChange={(_event, data) => setFieldValue('name', data.value as string)}
                    value={values.name}
                  />
                  {showErrors(errors.name, touched.name)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Validity Period</Label>
                  <div className="flex-container">
                    <CustomCalendar
                      name="validFrom"
                      option="date"
                      placeholder="Month/Year"
                      setFieldValue={setFieldValue}
                      value={values.validFrom}
                    />

                    <p id="yos-to">TO</p>
                    <CustomCalendar
                      name="validTo"
                      option="date"
                      placeholder="Month/Year"
                      setFieldValue={setFieldValue}
                      value={values.validTo}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
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
      {props.certifications && props.certifications.length > 0 && (
        <Grid columns={3} textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">Certificate</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">Validity Period</Header>
            </Grid.Column>
          </Grid.Row>
          {props.certifications.map((obj: Certifications) => (
            <Grid.Row key={obj.id}>
              <Grid.Column>
                <p>{obj.name}</p>
              </Grid.Column>
              <Grid.Column textAlign="left">
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={10}>
                      <p>{`${obj.validFrom} - ${obj.validTo}`}</p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Icon
                        onClick={() => obj.id && handleDelete(obj.id)}
                        style={{ color: '#161632' }}
                        name="delete"
                        circular
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      )}
    </Grid.Column>
  );
}

export default CertificationComponent;
