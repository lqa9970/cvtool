import { Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import TextAreaInput from "../TextAreaInput/TextArea";
import "./Bio.scss";

type FormValues = {
  bioDescription: string;
};

type BioProps = {
  bio: string | undefined;
  userId: string | undefined;
};

function BioForm({ bio, userId }: BioProps) {
  const [updateUser] = useUpdateUser();
  if (bio === undefined) {
    // eslint-disable-next-line no-param-reassign
    bio = "";
  }

  return (
    <Grid.Column>
      {userId && (
        <Formik<FormValues>
          initialValues={{ bioDescription: bio }}
          onSubmit={(values) => {
            updateUser({ bio: values.bioDescription }, userId)
              .then(() => null)
              .catch(() => null);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <TextAreaInput
                      id="bio-text-area"
                      value={values.bioDescription}
                      name="bioDescription"
                      placeholder="Enter your bio here"
                      handleChange={handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row id="button-row-position">
                  <Grid.Column>
                    <Button id="bio-add-button" type="submit">
                      Save
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </Grid.Column>
  );
}

export default BioForm;
