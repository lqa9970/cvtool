import { ChangeEvent } from "react";
import {
  Grid,
  GridRow,
  Input,
  Icon,
  SemanticICONS,
  Label,
} from "semantic-ui-react";
import "./SocialLink.scss";

type ISocialLink = {
  urlValue: string;
  fieldName: string;
  errorMsg: string | undefined;
  iconName: SemanticICONS;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

function SocialLink({
  urlValue,
  fieldName,
  errorMsg,
  iconName,
  onChange,
}: ISocialLink) {
  return (
    <GridRow columns={2}>
      <Grid.Column width={2}>
        <Icon bordered id="soc-link-icon" name={iconName} size="large" />
      </Grid.Column>
      <Grid.Column width={14}>
        <Input
          fluid
          type="text"
          id="soc-link-input"
          name={fieldName}
          value={urlValue}
          error={!!errorMsg}
          onChange={onChange}
        />
        {errorMsg && (
          <Label basic color="red" pointing="above">
            {errorMsg}
          </Label>
        )}
      </Grid.Column>
    </GridRow>
  );
}

export default SocialLink;
