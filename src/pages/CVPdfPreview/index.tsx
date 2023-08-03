import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Link, useLocation } from "react-router-dom";
import { Button, Grid, Icon } from "semantic-ui-react";
import cv from "../../assets/CVhighres.png";
import ninja from "../../assets/ninja.png";
import { EmployeeUser, PdfOptions } from "../../types/types";
import "./index.scss";

type PdfPreviewProps = {
  talent: EmployeeUser | null;
  options: PdfOptions;
};

type PdfLocationProps = {
  state: PdfPreviewProps;
};

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UE80V4bVkA.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80V4bVkA.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UE80V4bVkA.ttf",
      fontWeight: 700,
    },
  ],
});

// Create style
const styles = StyleSheet.create({
  page: {
    backgroundImage: cv,
    color: "#161632",
    fontSize: "10",
    fontFamily: "Rubik",
  },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "100%",
    width: "100%",
  },
  container: {
    padding: 20,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  experienceSection: {
    border: "2px black solid",
    borderRadius: 100,
    height: 10,
    width: 10,
    left: -6,
    top: 12,
    zIndex: 1000,
    backgroundColor: "white",
  },
  section: {
    marginTop: 5,
    paddingTop: 5,
  },
  horizontalLine: {
    marginTop: 10,
    border: "1px solid black",
  },
  verticalLine: {
    borderLeft: "1px solid black",
    marginTop: 5,
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    marginTop: 70,
    paddingHorizontal: 5,
    width: "30%",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100,
    marginHorizontal: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  topMargin: {
    marginTop: 10,
  },
  viewer: {
    width: window.innerWidth / 1.5,
    height: window.innerHeight,
    margin: 50,
  },
  image: {
    width: 100,
    padding: 10,
    borderRadius: 50,
    marginLeft: 30,
    backgroundColor: "white",
  },
  h2: {
    fontSize: "18",
    color: "black",
  },
  h3: {
    fontSize: "14",
    color: "black",
  },
  h4: {
    fontSize: "12",
    color: "black",
  },
  paddedH3: {
    fontSize: "14",
    color: "black",
    paddingLeft: 5,
  },
  paddedH3Right: {
    fontSize: "14",
    color: "black",
    paddingLeft: 10,
  },
  paddedH4Right: {
    fontSize: "12",
    color: "black",
    paddingLeft: 10,
  },
  wrappingText: {
    width: 350,
  },
  textPadding: {
    paddingLeft: 5,
  },
  textPaddingRight: {
    paddingLeft: 10,
  },
  redText: {
    color: "#FF2837",
  },
});

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
              <Image style={styles.image} src={ninja} />
              <View style={styles.section}>
                {options.singles.name && (
                  <Text style={styles.h2}>{talent.name}</Text>
                )}
                <View style={styles.section}>
                  {options.singles.phone_number && (
                    <>
                      <Text style={styles.h3}>Phone</Text>
                      <Text style={styles.textPadding}>
                        {talent.phone_number}
                      </Text>
                    </>
                  )}
                  {options.singles.email && (
                    <>
                      <Text style={styles.h3}>Email</Text>
                      <Text style={styles.textPadding}>{talent.email}</Text>
                    </>
                  )}
                  {options.singles.location && (
                    <>
                      <Text style={styles.h3}>Location</Text>
                      <Text style={styles.textPadding}>{talent.location}</Text>
                    </>
                  )}
                </View>
                {options.tech_skills.includes(true) && (
                  <View style={styles.section}>
                    <Text style={styles.h2}>
                      Skills, <Text style={styles.redText}>Competences</Text>
                    </Text>
                    <View style={styles.section}>
                      {talent.tech_skills?.map((skill, index) => {
                        if (options.tech_skills[index]) {
                          return (
                            <Text key={skill.id} style={styles.textPadding}>
                              {skill.name}
                            </Text>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </View>
                  </View>
                )}
                {/* <View style={styles.section}>
                  <Text style={styles.h2}>Soft Skills</Text>
                </View> */}
                {options.certifications.includes(true) && (
                  <View style={styles.section}>
                    <Text style={styles.h2}>Certifications</Text>
                    {talent.certifications?.map((certification, index) => {
                      return (
                        <View
                          key={certification.name + index.toString()}
                          style={styles.section}
                        >
                          <Text style={styles.textPadding}>
                            {certification.name}
                          </Text>
                          <Text style={styles.textPadding}>
                            {certification.validFrom} - {certification.validTo}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
                {options.education.includes(true) && (
                  <View style={styles.section}>
                    <Text style={styles.h2}>Education</Text>
                    {talent.education?.map((education, index) => {
                      if (options.education[index]) {
                        return (
                          <View key={education.id} style={styles.section}>
                            <Text style={styles.paddedH3}>
                              {education.degree}
                            </Text>
                            <Text style={styles.textPadding}>
                              {education.school}
                            </Text>
                            <Text style={styles.textPadding}>
                              {education.endMonthYear.slice(-4)}
                            </Text>
                          </View>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </View>
                )}
                {options.languages.includes(true) && (
                  <View style={styles.section}>
                    <Text style={styles.h2}>Languages</Text>
                    <View style={styles.section}>
                      {talent.languages?.map((language, index) => {
                        if (options.languages[index]) {
                          return (
                            <Text
                              key={language.name + index.toString()}
                              style={styles.textPadding}
                            >
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
              <Text style={styles.h2}>{talent.job_title}</Text>
              <Text style={styles.wrappingText}>{talent.bio}</Text>

              <View style={styles.topMargin} />
              <Text style={styles.h2}>Experience</Text>

              <View style={styles.horizontalLine} />
              <View style={styles.verticalLine}>
                {talent.projects?.map((project, index) => {
                  if (options.projects[index]) {
                    return (
                      <View key={project.id} style={styles.section}>
                        <View fixed style={styles.experienceSection} />
                        <Text style={styles.textPaddingRight}>
                          {project.startMonthYear} - {project.endMonthYear}
                        </Text>
                        <Text style={styles.paddedH4Right}>
                          {project.projectTitle}
                        </Text>
                        <Text style={styles.paddedH3Right}>{project.role}</Text>
                        <Text style={styles.textPaddingRight}>
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
  console.log(state.options);
  if (state.talent === null) {
    return <p> Something went wrong. We have our best monkeys on it!</p>;
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Link to="/pdf">
          <Icon size="big" name="angle left" />
        </Link>
        <PDFDownloadLink
          fileName="CV.pdf"
          document={MyDocument({
            options: state.options,
            talent: state.talent,
          })}
        >
          {({ loading }) =>
            loading ? (
              <Button id="button-spacing">Loading document...</Button>
            ) : (
              <Button id="button-spacing">Download the cv</Button>
            )
          }
        </PDFDownloadLink>
      </Grid.Column>
      <Grid.Column>
        <PDFViewer style={styles.viewer}>
          <MyDocument options={state.options} talent={state.talent} />
        </PDFViewer>
      </Grid.Column>
    </Grid.Row>
  );
}

export default PdfPreviewWithoutMemo;
