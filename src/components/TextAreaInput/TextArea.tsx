import { TextArea, Grid } from 'semantic-ui-react';

import './TextArea.scss';

type TextAreaInputProps = {
  id: string;
  value: string;
  name: string;
  placeholder: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = React.ChangeEvent<any> | string>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: React.ChangeEvent<any> | string) => void;
  };
};

function TextAreaInput({
  id,
  value,
  name,
  placeholder,
  handleChange
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
