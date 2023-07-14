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
import { Skills } from "../../../types/types";
import { uniqueIdGenerator } from "../../../utils/uid";

type ProjectSkillsProps = {
  addSkill: (
    field: string,
    value: Skills[],
    shouldValidate?: boolean | undefined
  ) => void;
  resetSkills: boolean;
};

function identify(arr: string[]): Skills[] {
  return arr.map((item) => {
    return { name: item, id: uniqueIdGenerator() };
  });
}

function ProjectSkills(props: ProjectSkillsProps) {
  const [skillSelected, setSkillSelected] = useState<string>("");
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<DropdownItemProps[]>([]);

  const skills = useGetFirestoreCollection({ collection: "skills" });

  useEffect(() => {
    if (skills.data) {
      const skillsOptions = (skills.data as Skills[]).map((skill) => ({
        key: skill.id,
        value: skill.name,
        text: skill.name,
      }));
      setOptions(skillsOptions);
    }
  }, [skills.data]);

  useEffect(() => {
    setSkillsSelected([]);
  }, [props.resetSkills]);

  const onChange = (
    event: SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setSkillSelected(data.value as string);
  };
  const onClick = () => {
    setSkillsSelected((prev) => {
      const skillsStrings = [...prev, skillSelected];
      props.addSkill("skills", identify(skillsStrings));
      return [skillSelected, ...prev] as string[];
    });
    setOptions((prev) => prev.filter((_) => _.text !== skillSelected));
  };

  const deleteHandler = (item: string, index: number) => {
    const filteredSkillsSelected = skillsSelected.filter(
      (_, index_) => index_ !== index
    );
    setSkillsSelected(filteredSkillsSelected);
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
              disabled={skillSelected === ""}
              id="edu-add-button"
              type="button"
              onClick={onClick}
            >
              Add
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div className="skill-box">
            {skillsSelected.map((item, index) => (
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
