import { Header } from 'semantic-ui-react';
import { EmployeeUser } from '../../types/types';

interface IBasicInfo {
  userDetails: EmployeeUser | null;
}

const BasicInfo = (props: IBasicInfo) => {
  return (
    <>
      <div className="field">
        <Header as="h3" dividing>
          Basic Info
        </Header>
        <Header size="large">{props.userDetails?.name}</Header>
        <Header size="small">{props.userDetails?.job_title}</Header>
        <Header.Subheader>
          <i className="envelope icon"></i>
          {props.userDetails?.email}
        </Header.Subheader>
        <Header.Subheader>
          <i className="address card icon"></i>
          {props.userDetails?.location}
        </Header.Subheader>
        <Header.Subheader>
          <i className="world square icon"></i>
          {props.userDetails?.nationality}
        </Header.Subheader>
        <Header.Subheader>
          <i className="user square icon"></i>
          Manager: {props.userDetails?.manager_name}
        </Header.Subheader>
        <Header.Subheader>
          <i className="envelope square icon"></i>
          Manger Email: {props.userDetails?.manager_email}
        </Header.Subheader>
        <Header.Subheader>
          <i className="linkedin icon"></i>
          <a href={props.userDetails?.social_links?.linkedin}>{props.userDetails?.social_links?.linkedin}</a>
        </Header.Subheader>
        <Header.Subheader>
          <i className="github icon"></i>
          <a href={props.userDetails?.social_links?.github}>{props.userDetails?.social_links?.github}</a>
        </Header.Subheader>
        <Header.Subheader>
          <i className="world icon"></i>
          <a href={props.userDetails?.social_links?.website}>{props.userDetails?.social_links?.website}</a>
        </Header.Subheader>
      </div>
    </>
  );
};

export default BasicInfo;
