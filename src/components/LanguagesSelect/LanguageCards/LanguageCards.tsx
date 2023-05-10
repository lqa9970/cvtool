import { Icon, Label } from 'semantic-ui-react';
import { LanguagesWithProficiency } from '../../../types/types';

type LanguageCardsProps = {
  languages: LanguagesWithProficiency[];
  onClickHandler: (index: number) => void;
};

const LanguageCards = ({ languages, onClickHandler }: LanguageCardsProps) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="display-flex flex-wrap bottom-margin-md">
      {languages.map((item, index) => (
        <Label className="language" key={index}>
          {item.name} - {item.proficiency}
          <Icon name="delete" link onClick={() => onClickHandler(index)}></Icon>
        </Label>
      ))}
    </div>
  );
};
export default LanguageCards;
