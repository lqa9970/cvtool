import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Dropdown, Label, Icon } from "semantic-ui-react";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useUpdateUser from "../../hooks/useUpdateUser";
import { UserTechSkill, Skill } from "../../types/types";
import { skillSchema } from "./SkillsUtils";

type SkillProps = {
  tech_skills: UserTechSkill[];
  userId: string;
};

const experienceOptions = Array.from({ length: 21 }, (_, index) => ({
  key: index,
  value: index,
  text: `${index} Year(s)`,
}));

function SkillComponent(props: SkillProps) {
  const [updateUser] = useUpdateUser();

  // change the collection here to tech_skills once collection has been populated
  const { data } = useGetFirestoreCollection({ collection: "skills" });
  const skillsData = data as Skill[];

  const [localSkills, setLocalSkills] = useState<UserTechSkill[]>(
    props.tech_skills || []
  );

  const remainingSkills = skillsData?.filter(
    (skill: Skill) =>
      !localSkills.some((localSkill: Skill) => localSkill.id === skill.id)
  );

  // Transform the data into the format the Dropdown expects
  const techOptions =
    remainingSkills?.map((skill) => ({
      key: skill.id,
      value: skill.name,
      text: skill.name,
    })) || [];

  const handleDelete = async (id: string) => {
    const updatedSkills =
      localSkills.filter((skill: UserTechSkill) => skill.id !== id) || [];
    setLocalSkills(updatedSkills);
    await updateUser({ tech_skills: updatedSkills }, props.userId);
  };

  const handleFormikSubmit = async (values: {
    name: string;
    experience: string;
  }) => {
    const selectedSkillId = techOptions.find(
      (option) => option.value === values.name
    )?.key;

    const newSkill = {
      ...values,
      id: selectedSkillId,
      experience: Number(values.experience),
    } as UserTechSkill;

    const updatedSkills = localSkills.concat(newSkill);
    setLocalSkills(updatedSkills);
    await updateUser({ tech_skills: updatedSkills }, props.userId);
  };

  const showErrors = (
    error: string | undefined,
    touched: boolean | undefined
  ) => {
    if (error && touched) {
      return (
        <Label basic color="red" pointing="above">
          {error}
        </Label>
      );
    }
  };

  return (
    <Grid.Column>
      <Formik
        initialValues={{ name: "", experience: "" }}
        validationSchema={skillSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await handleFormikSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column style={{ paddingRight: "20px", width: "290px" }}>
                  <Label id="form-labels">Tech</Label>
                  <Field
                    fluid
                    selection
                    as={Dropdown}
                    options={techOptions}
                    name="tech"
                    id="tech"
                    value={values.name}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => setFieldValue("name", value)}
                  />
                  {showErrors(errors.name, touched.name)}
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: "20px", width: "285px" }}>
                  <Label id="form-labels">Experience</Label>
                  <Field
                    fluid
                    selection
                    as={Dropdown}
                    options={experienceOptions}
                    name="experience"
                    id="experience"
                    value={values.experience}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => setFieldValue("experience", value)}
                  />
                  {showErrors(errors.name, touched.name)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    disabled={!isValid || !dirty || isSubmitting}
                    id="edu-add-button"
                    type="submit"
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
      {localSkills && localSkills?.length > 0 && (
        <Grid className="column" textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column>
              {localSkills?.map((skill: UserTechSkill) => (
                <Label key={skill.id} className="language">
                  {skill.name} - {skill.experience} years
                  <Icon
                    link
                    name="delete"
                    onClick={() => handleDelete(skill.id)}
                  />
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Grid.Column>
  );
}

export default SkillComponent;
