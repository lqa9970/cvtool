import { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { User } from '../../types/types';

import ninja from '../../assets/ninja.png';
import './SearchResultCard.scss';


const SearchResultCard = () => {
  const [user, setUser] = useState<User>({
    name: 'Emilia Strömberg',
    position: 'Design Lead, Team Lead',
    address: 'Berlin, Germany',
    email: 'emma.stromberg@nordcloud.com',
    phone: '+49 176 5432 1098',
    desc: 'Team: Build/Design - DACHSuperior',
    manager: 'Anna Doe',
    managerEmail: 'anna.doe@nordcloud.com',
    nationality: 'Finnish',
    techStack: [
      'Lead',
      'Boss',
      'Design',
      'PHP',
      'React',
      'CSS',
      'HTML',
      'Python'
    ]
  });

  return (
    <>
      <div className="container">
        <div className="card">
          <Grid>
            <Grid.Column width={6}>
              <div className="card_icons">
                <div className="card_icons_image">
                  <img src={ninja} alt="Avatar" />
                </div>
                <div className="card_icons_badges">
                  <img src={ninja} alt="Badge" />
                  <img src={ninja} alt="Badge" />
                  <img src={ninja} alt="Badge" />
                  <img src={ninja} alt="Badge" />
                  <img src={ninja} alt="Badge" />
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <div className="card_details">
                <h1>{user.position}</h1>
                <p>{user.name}</p>
                <p>{user.address}</p>
                <p>{user.email}</p>
                <hr />
                <h1>Tech stack:</h1>
                <div className="card_details_stack">
                  {user.techStack.map((stack) => {
                    return (
                      <span key={user.techStack.indexOf(stack)}>{stack}</span>
                    );
                  })}
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SearchResultCard;
