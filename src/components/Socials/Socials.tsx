import { Formik, Form } from "formik";
import { Grid } from "semantic-ui-react";
import useUpdateUser from "../../hooks/useUpdateUser";
import { EmployeeUser } from "../../types/types";
import SocialLink from "../SocialLink/SocialLink";
import SubmitButton from "../Submit/SubmitButton";
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
        <Form>
          <Grid>
            <SocialLink fieldName="linkedin" iconName="linkedin" />
            <SocialLink fieldName="github" iconName="github" />
            <SocialLink fieldName="website" iconName="world" />
            <SubmitButton label="Save" />
          </Grid>
        </Form>
      </Formik>
    </Grid.Column>
  );
}

export default Socials;
