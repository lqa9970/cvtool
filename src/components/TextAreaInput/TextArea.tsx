import { TextArea, Grid } from "semantic-ui-react";

import "./TextArea.scss";

type TextAreaInputProps = {
  id: string;
  value: string;
  name: string;
  placeholder: string;
  handleChange: {
    (error: React.ChangeEvent<unknown>): void;
    <T = React.ChangeEvent<unknown> | string>(
      field: T
    ): T extends React.ChangeEvent<unknown>
      ? // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        void
      : (error: React.ChangeEvent<unknown> | string) => void;
  };
};

function TextAreaInput({
  id,
  value,
  name,
  placeholder,
  handleChange,
}: TextAreaInputProps) {
  return (
    <Grid>
      <Grid.Column>
        <TextArea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          rows={6}
          onChange={handleChange}
        />
      </Grid.Column>
    </Grid>
  );
}

export default TextAreaInput;
