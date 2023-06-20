import { ChangeEvent } from "react";
import { Grid, GridRow, Input, Icon, SemanticICONS } from "semantic-ui-react";
import "./SocialLink.scss";

type ISocialLink = {
  link: string;
  iconName: SemanticICONS;
  setLink: (value: React.SetStateAction<string>) => void;
};

function SocialLink(props: ISocialLink) {
  return (
    <GridRow columns={2}>
      <Grid.Column width={2}>
        <Icon bordered id="soc-link-icon" name={props.iconName} size="large" />
      </Grid.Column>
      <Grid.Column width={14}>
        <Input
          fluid
          id="soc-link-input"
          type="text"
          value={props.link}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.setLink(event.target.value)
          }
        />
      </Grid.Column>
    </GridRow>
  );
}

export default SocialLink;
