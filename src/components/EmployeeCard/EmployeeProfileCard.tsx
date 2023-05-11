import { Card, Image, Feed, Button } from 'semantic-ui-react';
import { EmployeeUser, Skills } from '../../types/types';

import ninja from '../../assets/ninja.png';

import './EmployeeProfileCard.scss';

interface IEmployee {
  employee: EmployeeUser;
}

const EmployeeProfileCard = ({ employee }: IEmployee): JSX.Element => {
  return (
    <Card id="card">
      <Card.Content>
        <Image
          size="tiny"
          floated="left"
          src={ninja}
          tittl={employee.job_title}
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
            {employee.skills?.map((skill: Skills) => (
              <span>{skill.name}</span>
            ))}
          </Feed.Content>
        </Feed>
      </Card.Content>
      <Card.Content extra>
        <Button id="nc-btn">Read more</Button>
      </Card.Content>
    </Card>
  );
};

export default EmployeeProfileCard;
