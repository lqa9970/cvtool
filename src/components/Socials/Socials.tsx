import { FormEvent, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import { EmployeeUser } from "../../types/types";
import SocialLink from "../SocialLink/SocialLink";
import "./Socials.scss";

type ISocials = {
  userDetails: EmployeeUser | null;
};

function Socials(props: ISocials) {
  const [github, setGitHub] = useState(
    props.userDetails?.social_links?.github || ""
  );
  const [linkedin, setLinkedin] = useState(
    props.userDetails?.social_links?.linkedin || ""
  );
  const [website, setWebsite] = useState(
    props.userDetails?.social_links?.website || ""
  );

  const [updateUser] = useUpdateUser();

  const handleSocialLinks = async (event: FormEvent) => {
    event.preventDefault();
    // add some error handling incase userDetails can't be fetched
    props.userDetails &&
      (await updateUser(
        { social_links: { github, linkedin, website } },
        props.userDetails.id || ""
      ));
  };

  return (
    <Grid.Column>
      <Grid>
        <SocialLink link={linkedin} iconName="linkedin" setLink={setLinkedin} />
        <SocialLink link={github} iconName="github" setLink={setGitHub} />
        <SocialLink link={website} iconName="world" setLink={setWebsite} />
        <Grid.Row id="soc-button-row">
          <Grid.Column>
            <Button id="soc-add-button" onClick={handleSocialLinks}>
              Save
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  );
}

export default Socials;
