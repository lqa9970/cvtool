import { useState, SyntheticEvent, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";

import "./ProjectSkills.scss";
import useGetFirestoreCollection from "../../../hooks/useGetCollectionData";
import { Skill } from "../../../types/types";
import { uniqueIdGenerator } from "../../../utils/uid";

type ProjectSkillsProps = {
  addSkill: (
    field: string,
    value: Skill[],
    shouldValidate?: boolean | undefined
  ) => void;
  resetSkills: boolean;
};

function identify(arr: string[]): Skill[] {
  return arr.map((item) => {
    return { name: item, id: uniqueIdGenerator() };
  });
}

function ProjectSkills(props: ProjectSkillsProps) {
  const [isSkillSelected, setIsSkillSelected] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [options, setOptions] = useState<DropdownItemProps[]>([]);

  const skills = useGetFirestoreCollection({ collection: "skills" });

  useEffect(() => {
    if (skills.data) {
      const skillsOptions = (skills.data as Skill[]).map((skill) => ({
        key: skill.id,
        value: skill.name,
        text: skill.name,
      }));
      setOptions(skillsOptions);
    }
  }, [skills.data, props.resetSkills]);

  useEffect(() => {
    setSelectedSkills([]);
  }, [props.resetSkills]);

  const onChange = (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    if(value){
      setIsSkillSelected(true)
      setSelectedSkill(value as string);
    }
  };

  const handleAddSkill = () => {
    setSelectedSkill(null); // Clear selected skill after adding
    setIsSkillSelected(false);
    const allSkills = [...selectedSkills, selectedSkill as string]
    setSelectedSkills(allSkills)
    props.addSkill("skills", identify(allSkills));
    setOptions(options.filter((_) => _.text !== selectedSkill));
  };

  const deleteHandler = (item: string, index: number) => {
    const filteredSkillsSelected = selectedSkills.filter(
      (_, index_) => index_ !== index
    );
    setSelectedSkills(filteredSkillsSelected);
    setOptions((prev) => [...prev, { key: item, value: item, text: item }]);
    props.addSkill("skills", identify(filteredSkillsSelected));
  };

  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Label id="form-labels">Skills</Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div className="skills-row">
            <Dropdown
              selection
              placeholder="Skills"
              options={options}
              onChange={onChange}
            />
            <div className="p-1" />
            <Button
              disabled={!isSkillSelected}
              id="edu-add-button"
              type="button"
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div className="skill-box">
            {selectedSkills.map((item, index) => (
              <Label key={item + index.toString()} className="skill">
                {item}
                <Icon
                  link
                  name="delete"
                  onClick={() => deleteHandler(item, index)}
                />
              </Label>
            ))}
          </div>
        </Grid.Column>
      </Grid.Row>
    </>
  );
}

export default ProjectSkills;
