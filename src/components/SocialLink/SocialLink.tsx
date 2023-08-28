import { Grid, GridRow, Icon, SemanticICONS } from "semantic-ui-react";
import CustomInput from "../CustomInput/CustomInput";
import "./SocialLink.scss";

type ISocialLink = {
  fieldName: string;
  iconName: SemanticICONS;
};

function SocialLink({ fieldName, iconName }: ISocialLink) {
  return (
    <GridRow columns={2} id="soc-link-row">
      <Grid.Column width={2}>
        <Icon bordered id="soc-link-icon" name={iconName} size="large" />
      </Grid.Column>
      <Grid.Column width={14}>
        <CustomInput fluid type="text" id="soc-link-input" name={fieldName} />
      </Grid.Column>
    </GridRow>
  );
}

export default SocialLink;
