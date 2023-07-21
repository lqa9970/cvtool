import { Button, Card, Image } from "semantic-ui-react";
import ninja from "../../assets/ninja.png";

function AvatarCard() {
  return (
    <Card>
      <Image wrapped src={ninja} size="small" ui={false} />
      <Card.Content extra>
        <Button
          disabled
          style={{ backgroundColor: "rgb(22,22,50)", color: "white" }}
        >
          Change Avatar
        </Button>
      </Card.Content>
    </Card>
  );
}

export default AvatarCard;
