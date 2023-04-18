import { Button, Card, Image } from 'semantic-ui-react';
import ninja from '../../assets/ninja.png';

const AvatarCard = () => {
  return (
    <Card>
      <Image src={ninja} size="small" wrapped ui={false} />
      <Card.Content extra>
        <Button
          disabled
          style={{ backgroundColor: 'rgb(22,22,50)', color: 'white' }}
        >
          Change Avatar
        </Button>
      </Card.Content>
    </Card>
  );
};

export default AvatarCard;
