import { useFormikContext, useField } from "formik";
import {
  TextArea,
  TextAreaProps,
  Grid,
  Container,
  Comment,
} from "semantic-ui-react";

import "./TextArea.scss";

function TextAreaInput({ name, charLimit, ...props }: TextAreaProps) {
  const fieldName = name as string;
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(fieldName);

  const handleInputChange = (
    event_: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event_.target;
    setFieldValue(fieldName, value);
    setFieldTouched(fieldName, true, false);
  };

  return (
    <Grid.Row>
      <Grid.Column>
        <TextArea
          {...field}
          {...props}
          onChange={handleInputChange}
        />
        <Container className="character-limit-exceeded">
          {meta.touched && meta.error && (
            <Comment.Content className="error">{meta.error}</Comment.Content>
          )}
          {charLimit && meta.touched && meta.error && (
            <Comment.Content className="limit">
              {(field.value as string).length}/{charLimit}
            </Comment.Content>
          )}
        </Container>
      </Grid.Column>
    </Grid.Row>
  );
}

export default TextAreaInput;
