import { useState } from "react";
import { Popup, Icon } from "semantic-ui-react";
import ninja from "../../assets/ninja.png";
import { EmployeeUser } from "../../types/types";
import PopupContent from "./PopupContent";

type AccountMenuProps = {
  user: EmployeeUser;
  userRole: string;
  onRoleChange: (role: string) => void;
};

function AccountMenu({ user, userRole, onRoleChange }: AccountMenuProps) {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const handleClick = () => {
    setIsOpenModal(!isModalOpen);
  };

  return (
    <div className="NavContent_user">
      <Popup
        on="click"
        position="bottom center"
        size="large"
        trigger={
          <button type="button" onClick={handleClick}>
            <img src={ninja} alt="Ninja avatar" />
            <p>{user?.name?.split(" ")[0]}</p>
            {isModalOpen ? (
              <Icon inverted name="chevron up" />
            ) : (
              <Icon inverted name="chevron down" />
            )}
          </button>
        }
        content={
          <PopupContent
            user={user}
            userRole={userRole}
            onRoleChange={onRoleChange}
          />
        }
      />
    </div>
  );
}

export default AccountMenu;
