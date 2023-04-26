import { Formik, Form } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import TextAreaInput from '../TextAreaInput/TextArea';

interface FormValues {
  bioDescription: string;
}

const initialValues: FormValues = {
  bioDescription: ''
};

const BioForm = () => {
  return (
    <Grid.Column width={10}>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
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
            <Button
              style={{ backgroundColor: 'rgb(22,22,50)', color: 'white' }}
              type="submit"
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Grid.Column>
  );
};

export default BioForm;
