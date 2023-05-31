import { TextArea, Grid } from 'semantic-ui-react';

import './TextArea.scss';

type TextAreaInputProps = {
  id: string;
  children: never[];
  value: string;
  name: string;
  placeholder: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

const TextAreaInput = ({
  id,
  value,
  name,
  placeholder,
  handleChange
}: TextAreaInputProps) => {
  return (
    <Grid>
      <Grid.Column>
        <TextArea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={6}
        />
      </Grid.Column>
    </Grid>
  );
};

export default TextAreaInput;
