import { Header, Segment } from "semantic-ui-react";


function LastActivities() {

    return (
        <>
            <Header as="h4">Last Activites</Header>
            <Segment id="actLogs">
                <p>
                    Login to Okta <span>03.04.2023 </span>
                </p>
            </Segment>
        </>
    );
}

export default LastActivities;
