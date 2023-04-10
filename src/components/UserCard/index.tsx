import { Card, Header, Feed } from "semantic-ui-react";

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
    <Card className='userCard'
      image="https://react.semantic-ui.com/images/avatar/large/molly.png"
      header="Junior developer"
      meta="Sarah kallio, App-dev-1"
      extra={reminder}
    />
  );
};
export default UserCard;
