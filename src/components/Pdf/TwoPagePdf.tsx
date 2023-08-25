import { Page, View, Image, Document, Text } from "@react-pdf/renderer";
import cv from "../../assets/CVhighres.png";
import ninja from "../../assets/ninja.png";
import { PdfProps } from "../../types/types";
import PdfSkills from "./PdfSkills";
import { styles } from "./PdfStyling";

function TwoPageDocument(props: PdfProps) {
  const { talent, options } = props;
  const firstProjects = talent.projects?.slice(0, 2);
  const restProjects = talent.projects?.slice(2);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image fixed src={cv} style={styles.pageBackground} />
        <View style={styles.container}>
          <View style={styles.flexRow}>
            <View style={styles.leftColumn}>
              {!options.avatar && <Image style={styles.image} src={ninja} />}
              <View style={styles.section}>
                {!options.name && <Text style={styles.h3}>{talent.name}</Text>}
                <View style={styles.section}>
                  {!options.phone_number && (
                    <>
                      <Text style={styles.h4}>Phone</Text>
                      <Text>{talent.phone_number}</Text>
                    </>
                  )}
                  {!options.email && (
                    <>
                      <Text style={styles.h4}>Email</Text>
                      <Text>{talent.email}</Text>
                    </>
                  )}
                  {!options.location && (
                    <>
                      <Text style={styles.h4}>Location</Text>
                      <Text>{talent.location}</Text>
                    </>
                  )}
                </View>
                <PdfSkills
                  options={options}
                  talent={talent}
                  skill="tech_skills"
                />
                <PdfSkills
                  options={options}
                  talent={talent}
                  skill="soft_skills"
                />
                {options.certifications.length !==
                  talent.certifications?.length &&
                  talent.certifications && (
                    <View style={styles.section}>
                      <Text style={styles.h3}>Certifications</Text>
                      {talent.certifications?.map((certification, index) => {
                        if (
                          !options.certifications.includes(certification.name)
                        ) {
                          return (
                            <View
                              key={certification.name + index.toString()}
                              style={styles.section}
                            >
                              <Text>{certification.name}</Text>
                              <Text>
                                {certification.validFrom} -{" "}
                                {certification.validTo}
                              </Text>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </View>
                  )}
                {options.education.length !== talent.education?.length &&
                  talent.education && (
                    <View style={styles.section}>
                      <Text style={styles.h3}>Education</Text>
                      {talent.education?.map((education) => {
                        if (!options.education.includes(education.id)) {
                          return (
                            <View key={education.id} style={styles.section}>
                              <Text>{education.degree}</Text>
                              <Text>{education.school}</Text>
                              <Text>{education.endMonthYear?.slice(-4)}</Text>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </View>
                  )}
                {options.languages.length !== talent.languages?.length &&
                  talent.languages && (
                    <View style={styles.section}>
                      <Text style={styles.h3}>Languages</Text>
                      <View style={styles.section}>
                        {talent.languages?.map((language, index) => {
                          if (!options.languages.includes(language.name)) {
                            return (
                              <Text key={language.name + index.toString()}>
                                {language.name} - {language.proficiency}
                              </Text>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </View>
                    </View>
                  )}
              </View>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.h3paddingBottom}>{talent.job_title}</Text>
              <Text style={styles.wrappingText}>{talent.bio}</Text>
              <View style={styles.topMargin} />
              {options.projects.length !== talent.projects?.length &&
                firstProjects && (
                  <>
                    <Text style={styles.h3}>Experience</Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.verticalLine}>
                      {firstProjects.map((project) => {
                        if (!options.projects.includes(project.id)) {
                          return (
                            <View key={project.id} style={styles.section}>
                              <View fixed style={styles.experienceSection} />
                              <Text style={styles.textPaddingRight}>
                                {project.startMonthYear} -{" "}
                                {project.endMonthYear}
                              </Text>
                              <Text style={styles.paddedH4Right}>
                                {project.projectTitle}
                              </Text>
                              <Text style={styles.bold}>{project.role}</Text>
                              <Text style={styles.projectText}>
                                {project.projectDescription}
                              </Text>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </View>
                  </>
                )}
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
        <Image fixed src={cv} style={styles.pageBackground} />
        <View style={styles.twoPageContainer}>
          <View style={styles.leftTwoPage} />
          <View style={styles.leftVerticalLine} />
          {options.projects.length !== talent.projects?.length &&
            restProjects && (
              <View>
                {restProjects.map((project) => {
                  if (!options.projects.includes(project.id)) {
                    return (
                      <View key={project.id} style={styles.section}>
                        <View fixed style={styles.experienceSection} />
                        <Text style={styles.textPaddingRight}>
                          {project.startMonthYear} - {project.endMonthYear}
                        </Text>
                        <Text style={styles.paddedH4Right}>{project.role}</Text>
                        <Text style={styles.bold}>{project.projectTitle}</Text>
                        <Text style={styles.projectText}>
                          {project.projectDescription}
                        </Text>
                      </View>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            )}
        </View>
        <View style={styles.leftHorizontalLine} />
      </Page>
    </Document>
  );
}

export default TwoPageDocument;
