import { CheckboxProps, Radio } from 'semantic-ui-react';
import { FormEvent, useState } from 'react';

interface IMyProps {
  proficiency: string;
  handleProficiencyChange: (value: string) => void;
}

const LanguageProficiencies = ({
  proficiency,
  handleProficiencyChange
}: IMyProps) => {
  const clickHandler = (
    event: FormEvent<HTMLInputElement>,
    _data: CheckboxProps
  ) => {
    if (!event.currentTarget.textContent) {
      return;
    }
    handleProficiencyChange(event.currentTarget.textContent);
  };

  return (
    <div className="display-flex">
      <p>Choose the level:</p>
      <div className="radio-button-group">
        <Radio
          onChange={clickHandler}
          name="Native"
          label="Native"
          value="Native"
          checked={proficiency === 'Native'}
        />
        <Radio
          onChange={clickHandler}
          name="Proficient"
          label="Proficient"
          value="Proficient"
          checked={proficiency === 'Proficient'}
        />
        <Radio
          onChange={clickHandler}
          name="Other"
          label="Other"
          value="Other"
          checked={proficiency === 'Other'}
        />
      </div>
    </div>
  );
};
export default LanguageProficiencies;
