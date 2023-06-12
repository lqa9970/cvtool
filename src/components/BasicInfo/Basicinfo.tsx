import { Header } from "semantic-ui-react";
import { EmployeeUser } from "../../types/types";

import "./BasicInfo.scss";

type IBasicInfo = {
  userDetails: EmployeeUser | null;
};

function BasicInfo(props: IBasicInfo) {
  return (
    <>
      <div className="field">
        <Header size="large">{props.userDetails?.name}</Header>
        <Header size="small">{props.userDetails?.job_title}</Header>
        <Header.Subheader>
          <i className="envelope icon" />
          {props.userDetails?.email}
        </Header.Subheader>
        <Header.Subheader>
          <i className="address card icon" />
          {props.userDetails?.location}
        </Header.Subheader>
        <Header.Subheader>
          <i className="world square icon" />
          {props.userDetails?.nationality}
        </Header.Subheader>
        <Header.Subheader>
          <i className="user square icon" />
          Manager: {props.userDetails?.manager_name}
        </Header.Subheader>
        <Header.Subheader>
          <i className="envelope square icon" />
          Manger Email: {props.userDetails?.manager_email}
        </Header.Subheader>
        <Header.Subheader>
          <i className="phone icon" />
          {props.userDetails?.phone_number}
        </Header.Subheader>
      </div>
    </>
  );
}

export default BasicInfo;
