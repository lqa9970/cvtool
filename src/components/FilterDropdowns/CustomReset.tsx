import { ReactNode, MouseEvent } from "react";
import { Header } from "semantic-ui-react";

import "./FilterDropdowns.scss";

type CustomButtonProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  label: ReactNode;
};

function CustomReset({ label, onClick }: CustomButtonProps) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    // TODO: fix accesibility
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div id="reset-button" onClick={handleClick}>
      <Header as="h4">{label}</Header>
    </div>
  );
}

export default CustomReset;
