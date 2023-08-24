import { useFormikContext, useField } from "formik";
import { TextArea, TextAreaProps, Grid } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type TextAreaInputProps = TextAreaProps & {
  name: string;
  charLimit: number;
};

function TextAreaInput({ name, charLimit, ...props }: TextAreaInputProps) {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(name); // The 'field' object contains the 'value' prop, which will be automatically populated with the field's value.
  const handleInputChange = (
    event_: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event_.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };

  return (
    <Grid.Row>
      <Grid.Column>
        <TextArea {...field} {...props} onChange={handleInputChange} />
        <ErrorMessage fieldName={name} charLimit={charLimit} />
      </Grid.Column>
    </Grid.Row>
  );
}

export default TextAreaInput;
