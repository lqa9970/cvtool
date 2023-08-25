import { useFormikContext, useField } from "formik";
import { Input, InputProps, Label } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type CustomInputProps = InputProps & {
  name: string;
  label?: string;
  charLimit?: number;
  required?: boolean;
};
function CustomInput({
  label,
  name,
  charLimit,
  ...props
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
          {label} {props.required && <span>*</span>}
        </Label>
      )}
      <Input
        {...field}
        {...props}
        error={meta.touched && !!meta.error}
        onChange={handleInputChange}
      />
      <ErrorMessage fieldName={name} charLimit={charLimit} />
    </div>
  );
}

export default CustomInput;
