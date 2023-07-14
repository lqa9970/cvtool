import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Dropdown, Label, Icon } from "semantic-ui-react";
import * as Yup from "yup";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useUpdateUser from "../../hooks/useUpdateUser";
import { UserTechSkill, Skill } from "../../types/types";

type SkillProps = {
  tech_skills: UserTechSkill[];
  userId: string;
};

export const skillSchema = Yup.object().shape({
  experience: Yup.number()
    .required("Experience is required")
    .integer("Experience must be an integer")
    .min(0, "Experience cannot be less than 0")
    .max(20, "Experience cannot be more than 20"),
});

const experienceOptions = Array.from({ length: 21 }, (_, index) => ({
  key: index,
  value: index,
  text: `${index} Year(s)`,
}));

function SkillComponent(props: SkillProps) {
  // change the collection here to tech_skills once collection has been populated
  const { data } = useGetFirestoreCollection({ collection: "skills" });
  const skillsData = data as Skill[];

  // Transform the data into the format the Dropdown expects
  const techOptions =
    skillsData?.map((skill) => ({
      key: skill.id,
      value: skill.name,
      text: skill.name,
    })) || [];
  const [updateUser] = useUpdateUser();

  const [localSkills, setLocalSkills] = useState<UserTechSkill[]>(
    props.tech_skills || []
  );

  const handleDelete = async (id: string) => {
    const updatedSkills = localSkills.filter(
      (skill: UserTechSkill) => skill.id !== id
    );
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

  return (
    <Grid.Column>
      <Formik
        initialValues={{ name: "", experience: "" }}
        validationSchema={skillSchema}
        onSubmit={(values) => handleFormikSubmit(values)}
      >
        {({ values, setFieldValue, handleSubmit }) => (
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
                    value={values.name}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => setFieldValue("name", value)}
                  />
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: "20px", width: "285px" }}>
                  <Label id="form-labels">Experience</Label>
                  <Field
                    fluid
                    selection
                    as={Dropdown}
                    options={experienceOptions}
                    name="experience"
                    value={values.experience}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => setFieldValue("experience", value)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button id="edu-add-button" type="submit">
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
