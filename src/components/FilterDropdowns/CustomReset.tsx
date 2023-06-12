import { ReactNode, MouseEvent } from 'react';
import { Header } from 'semantic-ui-react';

type CustomButtonProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  label: ReactNode;
};

function CustomReset({ label, onClick }: CustomButtonProps) {
  const handelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {onClick(event);}
  };

  return (
    <div onClick={handelClick}>
      <Header as="h4">{label}</Header>
    </div>
  );
}

export default CustomReset;
