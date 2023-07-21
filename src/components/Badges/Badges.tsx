import { useNavigate } from "react-router-dom";
import { Header, Segment, Icon } from "semantic-ui-react";


function Badges() {
  const navigate = useNavigate();

  return (
    <>
      <Header as="h3">Badges</Header>
      <Segment placeholder textAlign="center">
        <Header icon as="h4">
          <Icon
            id="cvArea"
            name="plus square outline"
            onClick={() => navigate("/cv")}
          />
          You haven&apos;t attach unknown badges.
        </Header>
      </Segment>
    </>
  );
}

export default Badges;
