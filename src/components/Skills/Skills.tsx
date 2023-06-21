import { Formik, Form, Field } from 'formik';
import { Skill } from '../../types/types';
import { Button, Grid, Dropdown } from 'semantic-ui-react';
import { Header, Label, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import useUpdateUser from '../../hooks/useUpdateUser';
import { uniqueIdGenerator } from '../../utils/uid';
import * as Yup from 'yup';
import useGetSkills from '../../hooks/useGetSkills';


type SkillProps = {
  skills: any;
  userId: string;
};


export const skillSchema = Yup.object().shape({

  experience: Yup.number()
    .required('Experience is required')
    .integer('Experience must be an integer')
    .min(0, 'Experience cannot be less than 0')
    .max(20, 'Experience cannot be more than 20'),
});

const experienceOptions = Array.from({length: 21}, (_, i) => ({ key: i, value: i, text: `${i} Year(s)` }));



function SkillComponent(props: SkillProps) {
  const skillsData = useGetSkills();

  // Transform the data into the format the Dropdown expects
  const techOptions = skillsData?.map(skill => ({
    key: skill.id,
    value: skill.name,
    text: skill.name,
  })) || [];
  const [updateUser] = useUpdateUser();

  const [localSkills, setLocalSkills] = useState<Skill[]>(props.skills || []);

  useEffect(() => {
    setLocalSkills(props.skills);
  }, [props.skills]);

  const handleDelete = (id: string) => {
    // Update the localSkills state right away.
    const updatedSkills = localSkills.filter((skill: Skill) => skill.id !== id);
    setLocalSkills(updatedSkills);
    // Also update the user's skills in your database.
    updateUser({ skills: updatedSkills }, props.userId)
      .then(() => null)
      .catch(() => null);
  };



  const handleFormikSubmit = (values: { tech: string; experience: string }) => {
    const skills = props.skills || [];
    const selectedSkillId = techOptions.find(option => option.value === values.tech)?.key;
    skills.push({ ...values, id: selectedSkillId, experience: Number(values.experience) }); 
    updateUser({ skills: skills }, props.userId)
      .then(() => null)
      .catch(() => null);
  };
  
  

  return (
    <Grid.Column>
      <Formik
        initialValues={{ tech: '', experience: '' }}
        validationSchema={skillSchema}
        onSubmit={(values) => handleFormikSubmit(values)}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column  style={{ paddingRight: "20px", width: "290px" }}>
                  <Label id="form-labels">Tech</Label>
                  <Field
                    as={Dropdown}
                    fluid
                    selection
                    options={techOptions}
                    name="tech"
                    onChange={(_ : any, { value }: { value: string }) => setFieldValue("tech", value)}
                    value={values.tech}
                  />
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: "20px", width: "285px" }}>
                  <Label id="form-labels">Experience</Label>
                  <Field
                    as={Dropdown}
                    fluid
                    selection
                    options={experienceOptions}
                    name="experience"
                    onChange={(_ : any, { value }: { value: string }) => setFieldValue("experience", value)}
                    value={values.experience}
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
        <Grid className='column' textAlign="left" verticalAlign="top" >
          <Grid.Row>
            <Grid.Column>
              {localSkills?.map((skill: Skill) => (
                <Label key={skill.id} className="language">
                  {skill.tech} - {skill.experience} years
                  <Icon link name="delete" onClick={() => handleDelete(skill.id)} />
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

