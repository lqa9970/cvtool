import { Icon, Label } from "semantic-ui-react";
import { LanguagesWithProficiency } from "../../../types/types";

type LanguageCardsProps = {
  languages: LanguagesWithProficiency[];
  onClickHandler: (index: number) => void;
};

function LanguageCards({ languages, onClickHandler }: LanguageCardsProps) {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <div className="display-flex flex-wrap bottom-margin-md">
      {languages.map((item, index) => (
        <Label key={item.name} className="language">
          {item.name} - {item.proficiency}
          <Icon link name="delete" onClick={() => onClickHandler(index)} />
        </Label>
      ))}
    </div>
  );
}
export default LanguageCards;
