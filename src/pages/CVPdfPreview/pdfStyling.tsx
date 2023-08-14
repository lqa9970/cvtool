import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.ttf",
      fontWeight: 300,
    },
    {
      src: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UE80V4bVkA.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80V4bVkA.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UE80V4bVkA.ttf",
      fontWeight: 700,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
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
    marginLeft: 50,
    marginRight: 20,
  },
  image: {
    width: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  h2: {
    fontSize: "16",
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
  paddedH4: {
    fontSize: "12",
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
  projectText: {
    paddingLeft: 10,
    width: 330,
  },
});
