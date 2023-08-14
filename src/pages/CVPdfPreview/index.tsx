import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Link, useLocation } from "react-router-dom";
import { Button, Grid, Icon } from "semantic-ui-react";
import cv from "../../assets/CVhighres.png";
import ninja from "../../assets/ninja.png";
import { EmployeeUser, PdfOptions } from "../../types/types";
import "./index.scss";
import { styles } from "./pdfStyling";

type PdfPreviewProps = {
  talent: EmployeeUser | null;
  options: PdfOptions;
};

type PdfLocationProps = {
  state: PdfPreviewProps;
};

export function MyDocument(documentProps: PdfPreviewProps) {
  if (documentProps.talent === null) {
    return <p> Something went wrong</p>;
  }

  const { talent, options } = documentProps;
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
                {options.tech_skills.length !== talent.tech_skills?.length &&
                  talent.tech_skills && (
                    <View style={styles.section}>
                      <Text style={styles.h3}>Skills</Text>
                      <View style={styles.section}>
                        {talent.tech_skills?.map((skill) => {
                          return !options.tech_skills.includes(skill.name) ? (
                            <Text key={skill.id}>{skill.name}</Text>
                          ) : null;
                        })}
                      </View>
                    </View>
                  )}
                {options.soft_skills.length !== talent.soft_skills?.length &&
                  talent.soft_skills && (
                    <View style={styles.section}>
                      <Text style={styles.h3}>Soft skills</Text>
                      <View style={styles.section}>
                        {talent.soft_skills?.map((skill) => {
                          return !options.soft_skills.includes(skill.name) ? (
                            <Text key={skill.id}>{skill.name}</Text>
                          ) : null;
                        })}
                      </View>
                    </View>
                  )}
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
                talent.projects && (
                  <>
                    <Text style={styles.h3}>Experience</Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.verticalLine}>
                      {talent.projects?.map((project) => {
                        if (!options.projects.includes(project.id)) {
                          return (
                            <View key={project.id} style={styles.section}>
                              <View fixed style={styles.experienceSection} />
                              <Text style={styles.textPaddingRight}>
                                {project.startMonthYear} -{" "}
                                {project.endMonthYear}
                              </Text>
                              <Text style={styles.paddedH4Right}>
                                {project.role}
                              </Text>
                              <Text style={styles.bold}>
                                {project.projectTitle}
                              </Text>
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
                    <View style={styles.horizontalLine} />
                  </>
                )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
// Create Document Component
function PdfPreviewWithoutMemo() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { state }: PdfLocationProps = useLocation();
  console.log(state);
  if (state.talent === null) {
    return <p> Something went wrong. We have our best monkeys on it!</p>;
  }

  return (
    <Grid.Row columns={3}>
      <Link to="/pdf" state={state.talent} className="top-content">
        <Icon size="big" name="angle left" />
      </Link>
      <PDFViewer style={styles.viewer}>
        <MyDocument options={state.options} talent={state.talent} />
      </PDFViewer>
      <PDFDownloadLink
        fileName="CV.pdf"
        document={MyDocument({
          options: state.options,
          talent: state.talent,
        })}
      >
        {({ loading }) =>
          loading ? (
            <Button id="button-spacing" className="top-content">
              Loading document...
            </Button>
          ) : (
            <Button id="button-spacing" className="top-content">
              Download the cv
            </Button>
          )
        }
      </PDFDownloadLink>
    </Grid.Row>
  );
}

export default PdfPreviewWithoutMemo;
