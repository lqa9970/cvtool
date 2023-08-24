import { useFormikContext, useField } from "formik";
import { Input, Label, Container, Comment } from "semantic-ui-react";
import "./CustomInput.scss";

type CustomInputProps = {
  [restProps: string]: any;
  name: string;
  label?: string;
  charLimit?: number;
  required?: boolean;
};
function CustomInput({
  label,
  charLimit,
  name,
  ...restProps
}: CustomInputProps) {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const handleInputChange = (event_: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event_.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };
  return (
    <div>
      {label && (
        <Label id="form-labels">
          {label} {restProps.required && <span>*</span>}
        </Label>
      )}
      <Input
        {...field}
        {...restProps}
        error={meta.touched && !!meta.error}
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
    </div>
  );
}

export default CustomInput;
