import { Formik, Form } from 'formik';
import { Button, Grid, TextArea } from 'semantic-ui-react';
import TextAreaInput from '../TextAreaInput/TextArea';
import useUpdateUser from '../../hooks/useUpdateUser';
import './Bio.scss';

type FormValues = {
  bioDescription: string;
};

type BioProps = {
  bio: string | undefined;
  userId: string | undefined;
};

const BioForm = ({ bio, userId }: BioProps) => {
  const [updateUser] = useUpdateUser();
  if (bio === undefined) bio = '';

  return (
    <Grid.Column>
      {userId && (
        <Formik<FormValues>
          initialValues={{ bioDescription: bio }}
          onSubmit={(values) => {
            updateUser({ bio: values.bioDescription }, userId);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <TextArea
                      id="bio-text-area"
                      value={values.bioDescription}
                      name="bioDescription"
                      placeholder="Enter your bio here"
                      handleChange={handleChange}
                      children={[]}
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
};

export default BioForm;
