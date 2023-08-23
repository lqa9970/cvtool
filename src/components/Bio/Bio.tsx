import { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";
import * as Yup from "yup";
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

const regexWithSpecialCharacters = new RegExp('^[\\p{L}\\p{M}\\p{N}\\s\',.’-]*$', 'gu');
const bioSchema = Yup.object().shape({
  bioDescription: Yup.string().min(4, "Too Short").max(1250,"Character limit exceeded").matches(regexWithSpecialCharacters, 'Not a valid description'),
});

function BioForm({ bio, userId }: BioProps) {
  const [updateUser] = useUpdateUser();
  const [isCharLimitExceeded, setIsCharLimitExceeded] = useState(false);

 return (
    <Grid.Column>
      {userId && (
        <Formik<FormValues>
          initialValues={{ bioDescription: bio ?? "" }}
          validationSchema={bioSchema}
          onSubmit={(values, { setSubmitting }) => {
            updateUser({ bio: values.bioDescription }, userId)
              .catch(() => {})
              .finally(() => setSubmitting(false));
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            dirty,
            isValid,
          }) => (
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
                      characterLimit={1250}
                      onExceedLimit={setIsCharLimitExceeded}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row id="button-row-position">
                  <Grid.Column>
                    <Button
                      id="bio-add-button"
                      type="submit"
                      disabled={
                        isCharLimitExceeded ||
                        isSubmitting ||
                        !dirty ||
                        !isValid
                      }
                    >
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
