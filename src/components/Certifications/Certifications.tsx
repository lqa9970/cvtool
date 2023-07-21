import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Dropdown, Header, Label, Icon } from "semantic-ui-react";

import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useUpdateUser from "../../hooks/useUpdateUser";
import { Certification } from "../../types/types";
import CustomCalendar from "../Calendar/Calendar";
import {
  certificationSchema,
  defaultStartDate,
  defaultEndDate,
} from "./CertificationsUtils";
import "./Certifications.scss";

type CertificationProps = {
  certifications: Certification[] | undefined;
  userId: string;
};

function CertificationComponent(props: CertificationProps) {
  const [updateUser] = useUpdateUser();

  const { data } = useGetFirestoreCollection({ collection: "certification" });
  const certData = data as Certification[];

  const [localCerts, setLocalCerts] = useState<Certification[]>(
    props.certifications || []
  );

  const remainingCerts = certData?.filter(
    (cert: Certification) =>
      !localCerts.some((localCert: Certification) => localCert.id === cert.id)
  );

  const certificateOptions =
    remainingCerts?.map((certificate: Certification) => ({
      key: certificate.id,
      value: certificate.name,
      text: certificate.name,
    })) || [];

  const handleDelete = async (id: string) => {
    const deleteCertification =
      localCerts?.filter((cert: Certification) => cert.id !== id) || [];
    setLocalCerts(deleteCertification);
    await updateUser({ certifications: deleteCertification }, props.userId);
  };

  const handleFormikSubmit = async (values: {
    name: string;
    validFrom: string;
    validTo: string;
  }) => {
    const selectedCertId = certificateOptions.find(
      (option) => option.value === values.name
    )?.key;

    const newCert = {
      ...values,
      id: selectedCertId,
    } as Certification;

    const updatedCertifications = localCerts.concat(newCert);
    setLocalCerts(updatedCertifications);
    await updateUser({ certifications: updatedCertifications }, props.userId);
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
      validationSchema={certificationSchema}
        initialValues={{
          name: "",
          validFrom: defaultStartDate,
          validTo: defaultEndDate,
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await handleFormikSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Label id="form-labels">Certificate</Label>
                  <Field
                    fluid
                    selection
                    as={Dropdown}
                    options={certificateOptions}
                    name="certifications"
                    value={values.name}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => setFieldValue("name", value)}
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
                    {showErrors(errors.validFrom, touched.validFrom)}

                    <p id="yos-to">TO</p>
                    <CustomCalendar
                      name="validTo"
                      option="date"
                      placeholder="Month/Year"
                      setFieldValue={setFieldValue}
                      value={values.validTo}
                    />
                    {showErrors(errors.validTo, touched.validTo)}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    disabled={!values.name || isSubmitting}
                    id="edu-add-button"
                    type="submit"
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>

      {localCerts.length > 0 && (
        <Grid columns={3} textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h4">Certificate</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4">Validity Period</Header>
            </Grid.Column>
          </Grid.Row>

          {localCerts.map((cert: Certification) => (
            <Grid.Row key={cert.id}>
              <Grid.Column id="cert-column" verticalAlign="middle" width={8}>
                <p>{cert.name}</p>
              </Grid.Column>
              <Grid.Column width={6} verticalAlign="middle" textAlign="left">
                <p>{`${cert.validFrom} - ${cert.validTo}`}</p>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  icon
                  circular
                  fluid
                  id="delete-certification"
                  onClick={() => cert.id && handleDelete(cert.id)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      )}
    </Grid.Column>
  );
}

export default CertificationComponent;
