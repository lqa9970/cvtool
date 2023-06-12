import { FormEvent, useState } from 'react';
import { CheckboxProps, Radio } from 'semantic-ui-react';

type IMyProps = {
  proficiency: string;
  handleProficiencyChange: (value: string) => void;
}

function LanguageProficiencies({
  proficiency,
  handleProficiencyChange
}: IMyProps) {
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
          name="Native"
          label="Native"
          value="Native"
          checked={proficiency === 'Native'}
          onChange={clickHandler}
        />
        <Radio
          name="Proficient"
          label="Proficient"
          value="Proficient"
          checked={proficiency === 'Proficient'}
          onChange={clickHandler}
        />
        <Radio
          name="Other"
          label="Other"
          value="Other"
          checked={proficiency === 'Other'}
          onChange={clickHandler}
        />
      </div>
    </div>
  );
}
export default LanguageProficiencies;
