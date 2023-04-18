import { Formik, Form } from 'formik';
import { Button, Grid, Header, TextArea } from 'semantic-ui-react';

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
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Column width={12}>
                  <TextArea
                    name="bioDescription"
                    placeholder="Enter your description here..."
                    value={values.bioDescription}
                    onChange={handleChange}
                    style={{ minHeight: 100, minWidth: 500}} 
                    rows={6}
                  />
                </Grid.Column>
              </Grid>
              <Button type="submit">Save</Button>
              <Button type="button" onClick={handleReset}>
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </Grid.Column>
  );
};

export default BioForm;
