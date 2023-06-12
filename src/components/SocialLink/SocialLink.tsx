import { ChangeEvent } from 'react';
import { Grid, GridRow, Input } from 'semantic-ui-react';
import './SocialLink.scss';

type ISocialLink = {
  link: string;
  iconName: string;
  setLink: (value: React.SetStateAction<string>) => void;
}

function SocialLink(props: ISocialLink) {
  return (
    <GridRow columns={1} id="soc-link-inputs">
      <Grid.Column width={10}>
        <Input
          fluid
          icon={props.iconName}
          iconPosition="left"
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
