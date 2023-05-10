import { CheckboxProps, Radio } from 'semantic-ui-react';
import { FormEvent, useState } from 'react';

type IMyProps = { handleProficiencyChange: (value: string) => void };

const LanguageProficiencies = ({ handleProficiencyChange }: IMyProps) => {
  const [proficiency, setProficiency] = useState<string>('');

  const clickHandler = (
    event: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    if (!event.currentTarget.textContent) {
      return;
    }
    setProficiency(event.currentTarget.textContent);
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
        ></Radio>
        <Radio
          onChange={clickHandler}
          name="Proficient"
          label="Proficient"
          value="Proficient"
          checked={proficiency === 'Proficient'}
        ></Radio>
        <Radio
          onChange={clickHandler}
          name="Other"
          label="Other"
          value="Other"
          checked={proficiency === 'Other'}
        ></Radio>
      </div>
    </div>
  );
};
export default LanguageProficiencies;
