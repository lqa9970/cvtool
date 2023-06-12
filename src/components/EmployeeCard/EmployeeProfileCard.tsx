import { useState } from 'react';
import { Card, Image, Feed, Button, TransitionablePortal, Segment } from 'semantic-ui-react';
import { EmployeeUser, Skills } from '../../types/types';
import CVPreview from '../../pages/CVPreview';

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
          title={employee.job_title}
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
            {employee.skills?.map((skill: Skills, index) => (
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
                transition={{ animation: 'fade left', duration: '500' }}
                openOnTriggerClick
                trigger={<Button content={'See CV'} secondary />}
              >
                <Segment id="cv-preview-container">
                  <CVPreview employee={employee}/>
                </Segment>
              </TransitionablePortal>
      </Card.Content>
    </Card>
  );
};

export default EmployeeProfileCard;
