/* eslint-disable max-lines-per-function */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Dropdown, Label, Icon } from "semantic-ui-react";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useUpdateUser from "../../hooks/useUpdateUser";
import { UserTechSkill, Skill } from "../../types/types";
import SubmitButton from "../Submit/SubmitButton";
import { skillSchema } from "./SkillsUtils";

type SkillProps = {
  tech_skills: UserTechSkill[];
  soft_skills: Skill[];
  userId: string;
};

const experienceOptions = Array.from({ length: 21 }, (_, index) => ({
  key: index,
  value: index,
  text: `${index} Year(s)`,
}));

function SkillComponent(props: SkillProps) {
  const [updateUser] = useUpdateUser();
  const [softSelected, setSoftSelected] = useState(false);

  // change the collection here to tech_skills once collection has been populated
  const { data } = useGetFirestoreCollection({ collection: "skills" });
  const { data: softData } = useGetFirestoreCollection({
    collection: "soft_skills",
  });

  const skillsData = data as Skill[];
  const softSkillsData = softData as Skill[];

  const [localSkills, setLocalSkills] = useState<UserTechSkill[]>(
    props.tech_skills || []
  );
  const [localSoftSkills, setLocalSoftSkills] = useState<Skill[]>(
    props.soft_skills || []
  );

  const remainingSkills = skillsData?.filter(
    (skill: Skill) =>
      !localSkills.some((localSkill: Skill) => localSkill.id === skill.id)
  );

  const remainingSoftSkills = softSkillsData?.filter(
    (skill: Skill) =>
      !localSoftSkills.some((localSkill: Skill) => localSkill.id === skill.id)
  );

  // Transform the data into the format the Dropdown expects
  const techOptions =
    remainingSkills?.map((skill) => ({
      key: skill.id,
      value: skill.name,
      text: skill.name,
    })) || [];

  const softSkillOptions =
    remainingSoftSkills?.map((skill) => ({
      key: skill.name,
      value: skill.name,
      text: skill.name,
    })) || [];

  const handleDelete = async (id: string) => {
    const updatedSkills =
      localSkills.filter((skill: UserTechSkill) => skill.id !== id) || [];
    setLocalSkills(updatedSkills);
    await updateUser({ tech_skills: updatedSkills }, props.userId);
  };

  const handleSoftSkillDelete = async (id: string) => {
    const updatedSkills =
      localSoftSkills.filter((skill: Skill) => skill.id !== id) || [];
    setLocalSoftSkills(updatedSkills);
    await updateUser({ soft_skills: updatedSkills }, props.userId);
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

  const handleSoftSkillSubmit = async (values: { name: string }) => {
    const selectedSkillId = remainingSoftSkills.find(
      (skill) => skill.name === values.name
    )?.id;

    const newSkill = {
      name: values.name,
      id: selectedSkillId,
    } as Skill;

    const updatedSkills = localSoftSkills.concat(newSkill);
    setLocalSoftSkills(updatedSkills);
    await updateUser({ soft_skills: updatedSkills }, props.userId);
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
          await (softSkillOptions.some((option) => option.value === values.name)
            ? handleSoftSkillSubmit(values)
            : handleFormikSubmit(values));
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column style={{ paddingRight: "20px", width: "290px" }}>
                  <Label id="form-labels">Skill</Label>
                  <Field
                    fluid
                    selection
                    as={Dropdown}
                    options={[...techOptions, ...softSkillOptions]}
                    name="skill"
                    id="skill"
                    value={values.name}
                    onChange={(
                      event: React.SyntheticEvent<HTMLElement>,
                      { value }: { value: string }
                    ) => {
                      if (
                        softSkillOptions.some(
                          (option) => option.value === value
                        )
                      ) {
                        setSoftSelected(true);
                        values.experience = "0";
                      } else {setSoftSelected(false);}
                      setFieldValue("name", value);
                    }}
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
                    disabled={softSelected}
                    className={softSelected ? "disabled-field" : ""}
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
              <SubmitButton label="Add"/>
            </Grid>
          </Form>
        )}
      </Formik>
      {(localSkills || localSoftSkills) &&
        (localSkills?.length > 0 || localSoftSkills?.length > 0) && (
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
                {localSoftSkills?.map((skill) => (
                  <Label key={skill.id} className="softskill">
                    {skill.name}
                    <Icon
                      link
                      name="delete"
                      onClick={() => handleSoftSkillDelete(skill.id)}
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
