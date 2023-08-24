import { useFormikContext } from "formik";
import { Button, Grid } from "semantic-ui-react";
import "./SubmitButton.scss";

type SubmitButtonProps = {
  [restProps: string]: any;
  label: string;
};

function SubmitButton({ label, ...restProps }: SubmitButtonProps) {
  const { isValid, dirty, isSubmitting } = useFormikContext();
  return (
    <Grid.Row id="button-row">
      <Grid.Column>
        <Button
          id="submit-button"
          type="submit"
          disabled={isSubmitting || !isValid || !dirty}
          {...restProps}
        >
          {label}
        </Button>
      </Grid.Column>
    </Grid.Row>
  );
}

export default SubmitButton;
