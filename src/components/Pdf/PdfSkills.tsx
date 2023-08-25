import { View, Text } from "@react-pdf/renderer";
import { PdfProps } from "../../types/types";
import { styles } from "./PdfStyling";

type PdfSkillsProps = PdfProps & {
  skill: "soft_skills" | "tech_skills";
};

function PdfSkills(props: PdfSkillsProps) {
  const { options, talent, skill } = props;
  return (
    <>
      {options[skill].length !== talent[skill]?.length &&
        talent.soft_skills && (
          <View style={styles.section}>
            <Text style={styles.h3}>
              {skill === "soft_skills" ? "Soft Skills" : "Skills"}
            </Text>
            <View style={styles.section}>
              {talent[skill]?.map((item) => {
                return !options.soft_skills.includes(item.name) ? (
                  <Text key={item.id}>{item.name}</Text>
                ) : null;
              })}
            </View>
          </View>
        )}
    </>
  );
}

export default PdfSkills;
