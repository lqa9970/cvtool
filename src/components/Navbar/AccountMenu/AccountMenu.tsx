import { useState } from "react";
import { Popup, Icon, Image, SemanticICONS } from "semantic-ui-react";
import ninja from "../../../assets/ninja.png";
import { EmployeeUser } from "../../../types/types";
import PopupContent from "../PopupContent";
import "./AccountMenu.scss";

type AccountMenuProps = {
  user: EmployeeUser;
  userRole: string;
  onRoleChange: (role: string) => void;
};

function AccountMenu({ user, userRole, onRoleChange }: AccountMenuProps) {
  const [icon, setIcon] = useState<'down' | 'up'>('down');

  const toggleIcon = () => {
    setIcon(prevIcon => (prevIcon === 'down' ? 'up' : 'down'));
  };

  const iconName = `chevron ${icon}` as SemanticICONS ;
  
  return (
    <div className="NavContent_user">
      <Popup
        on="click"
        position="bottom center"
        size="large"
        trigger={
          <div className="avatar">
            <Image avatar src={ninja} />
            <span>{user?.name?.split(" ")[0]}</span>
            <Icon inverted name={iconName} />
          </div>
        }
        content={
          <PopupContent
            user={user}
            userRole={userRole}
            onRoleChange={onRoleChange}
          />
        }
        onOpen={toggleIcon}
        onClose={toggleIcon}
      />
    </div>
  );
}

export default AccountMenu;
