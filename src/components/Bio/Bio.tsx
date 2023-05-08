import { Formik, Form } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import TextAreaInput from '../TextAreaInput/TextArea';
import useUpdateUser from '../../hooks/useUpdateUser';

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
    <Grid.Column width={10}>
      {userId && (
        <Formik<FormValues>
          initialValues={{ bioDescription: bio }}
          onSubmit={(values) => {
            updateUser({ bio: values.bioDescription }, userId);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextAreaInput
                value={values.bioDescription}
                name="bioDescription"
                placeholder="Enter your bio here"
                handleChange={handleChange}
                children={[]}
              ></TextAreaInput>
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      )}
    </Grid.Column>
  );
};

export default BioForm;
