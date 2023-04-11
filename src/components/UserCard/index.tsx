import { Card, Header, Feed } from "semantic-ui-react";
import ninja from "../../assets/ninja.png"

import "./index.css";
const feedEvents = [
  {
    icon: "bell",
    summary: "You have to create cv",
    meta: "03.04.2023",
  },
  {
    icon: "star",
    summary: "You have a welcome message",
    meta: "01.04.2023",
  },
];

const reminder = (
  <>
    <Header size="medium">Reminder</Header>
    <div>
      <Feed events={feedEvents} size='small'/>
    </div>
  </>
);

const UserCard = (): JSX.Element => {
  return (
    <Card id='userCard'
      image={ninja}
      header="Junior developer"
      meta="Kukka kallio, App-dev-1"
      extra={reminder}
    />
  );
};
export default UserCard;
