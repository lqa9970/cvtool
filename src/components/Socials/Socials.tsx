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
        {({ values, handleChange, handleSubmit, errors, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <SocialLink
                fieldName="linkedin"
                iconName="linkedin"
                urlValue={values.linkedin}
                errorMsg={errors.linkedin}
                onChange={handleChange}
              />
              <SocialLink
                fieldName="github"
                iconName="github"
                urlValue={values.github}
                errorMsg={errors.github}
                onChange={handleChange}
              />
              <SocialLink
                fieldName="website"
                iconName="world"
                urlValue={values.website}
                errorMsg={errors.website}
                onChange={handleChange}
              />
              <Grid.Row id="soc-button-row">
                <Grid.Column>
                  <Button id="soc-add-button" type="submit" disabled={!isValid}>
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
