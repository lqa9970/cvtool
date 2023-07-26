import {
  Card,
  Image,
  Feed,
  Button,
  TransitionablePortal,
  Segment,
} from "semantic-ui-react";
import ninja from "../../assets/ninja.png";
import CVPreview from "../../pages/CVPreview";
import { EmployeeUser, UserTechSkill } from "../../types/types";

import "./EmployeeProfileCard.scss";

type IEmployee = {
  employee: EmployeeUser;
};

function EmployeeProfileCard({ employee }: IEmployee): JSX.Element {
  const seniorityClass = employee.experience_level?.toLowerCase();
  return (
    <Card id="card">
      <Card.Content>
        <Image
          size="tiny"
          floated="left"
          src={ninja}
          title={employee.job_title}
          className={seniorityClass}
        />
        <Card.Header>{employee?.job_title}</Card.Header>
        <Card.Meta>{employee.name}</Card.Meta>
        <Card.Meta>{employee.location}</Card.Meta>
        <Card.Meta>{employee.phone_number}</Card.Meta>
        <Card.Meta>Manager: {employee.manager_name}</Card.Meta>
        <Image id="badge" size="mini" src={ninja} alt="badge" />
        <Image id="badge" size="mini" src={ninja} alt="badge" />
        <Image id="badge" size="mini" src={ninja} alt="badge" />
        <Feed>
          <Feed.Content>
            <Card.Header as="h4">Tech Stack</Card.Header>
            {employee.tech_skills?.map((skill: UserTechSkill, index) => (
              <div key={index}>
                <span>{skill.name}</span>
              </div>
            ))}
          </Feed.Content>
        </Feed>
      </Card.Content>
      <Card.Content extra>
        <TransitionablePortal
          closeOnTriggerClick
          openOnTriggerClick
          transition={{ animation: "fade left", duration: "500" }}
          trigger={<Button secondary content="See CV" />}
        >
          <Segment id="cv-preview-container">
            <CVPreview employee={employee} />
          </Segment>
        </TransitionablePortal>
      </Card.Content>
    </Card>
  );
}

export default EmployeeProfileCard;
