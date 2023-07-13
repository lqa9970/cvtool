import { Button, Grid, Header, Icon, Label } from "semantic-ui-react";
import { ProjectHistory, Skills } from "../../../types/types";

type ProjectCardsProps = {
  projectHistory: ProjectHistory[];
  handleDelete: (id: string) => void;
};

function ProjectCards(props: ProjectCardsProps) {
  return (
    <Grid>
      {props.projectHistory?.map((object: ProjectHistory) => {
        return (
          <Grid.Row key={object.id}>
            <Grid.Column id="project-card" width={14}>
              <Header as="h3">{object.role}</Header>
              <span className="project-info-row">
                <p>{object.projectTitle}</p>
                <i>{"Ac: " + object.accountName}</i>
              </span>
              <p id="industry">{object.industry}</p>
              <p id="duration">{`${object.startMonthYear} - ${object.endMonthYear}`}</p>
              <p className="max-width-hidden">{object.projectDescription}</p>
              {object.skills?.length > 0 && (
                <div className="skill-box">
                  {object.skills.map((skill: Skills) => {
                    return (
                      <Label key={skill.id} className="skill">
                        {skill.name}
                      </Label>
                    );
                  })}
                </div>
              )}
            </Grid.Column>
            <Grid.Column width={2} textAlign="right" verticalAlign="middle">
              <Button
                icon
                circular
                id="delete-project"
                onClick={() => props.handleDelete(object.id)}
              >
                <Icon name="delete" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        );
      })}
    </Grid>
  );
}

export default ProjectCards;
