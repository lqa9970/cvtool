import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Header, Segment, Icon } from "semantic-ui-react";

import { formatDate } from "../../utils/date";

type ICreateEditCv = {
  last_cv_update: Timestamp | undefined;
};

function CreateEditCv({ last_cv_update }: ICreateEditCv) {
  const navigate = useNavigate();

  const lastUpdateOn = last_cv_update?.toDate() || null;
  const formattedDate = lastUpdateOn ? formatDate(lastUpdateOn) : null;

  return (
    <>
      <Header as="h3">My CV</Header>
      <Segment placeholder textAlign="center" className="hoverable">
        {lastUpdateOn ? (
          <>
            <Header icon as="h4">
              <Icon name="edit" onClick={() => navigate("/cv")} />
              Edit CV
            </Header>
            <p>Last Update</p>
            <p>{formattedDate}</p>
          </>
        ) : (
          <Header icon as="h4">
            <Icon
              id="cvArea"
              name="plus square outline"
              onClick={() => navigate("/cv")}
            />
            Create a new CV.
          </Header>
        )}
      </Segment>
    </>
  );
}

export default CreateEditCv;
