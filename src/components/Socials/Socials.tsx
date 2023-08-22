import { Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import { EmployeeUser } from "../../types/types";
import SocialLink from "../SocialLink/SocialLink";
import "./Socials.scss";
import { linksSchema, SocialLinks } from "./SocialsUtils";

type ISocials = {
  userDetails: EmployeeUser | null;
};

function Socials({ userDetails }: ISocials) {
  const githubUrl = userDetails?.social_links?.github ?? "";
  const linkedinUrl = userDetails?.social_links?.linkedin ?? "";
  const websiteUrl = userDetails?.social_links?.website ?? "";

  const [updateUser] = useUpdateUser();

  const handleFormikSubmit = async ({
    github,
    linkedin,
    website,
  }: SocialLinks) => {
    userDetails &&
      (await updateUser(
        {
          social_links: { github, linkedin, website },
        },
        userDetails.id || ""
      ));
  };

  return (
    <Grid.Column>
      <Formik
        validationSchema={linksSchema}
        initialValues={{
          github: githubUrl,
          linkedin: linkedinUrl,
          website: websiteUrl,
        }}
        onSubmit={(values) => handleFormikSubmit(values)}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <SocialLink fieldName="linkedin" iconName="linkedin" />
              <SocialLink fieldName="github" iconName="github" />
              <SocialLink fieldName="website" iconName="world" />
              <Grid.Row id="soc-button-row">
                <Grid.Column>
                  <Button
                    id="soc-add-button"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Save
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid.Column>
  );
}

export default Socials;
