import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Link, useLocation } from "react-router-dom";
import { Button, Grid, Icon } from "semantic-ui-react";
import { styles } from "../../components/Pdf/PdfStyling";
import SinglePageDocument from "../../components/Pdf/SinglePagePdf";
import TwoPageDocument from "../../components/Pdf/TwoPagePdf";
import "./index.scss";
import { EmployeeUser, PdfOptions } from "../../types/types";

type PdfPreviewProps = {
  options: PdfOptions;
  talent: EmployeeUser | null;
};

type PdfLocationProps = {
  state: PdfPreviewProps;
};

// Create Document Component
function PdfPreviewWithoutMemo() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { state }: PdfLocationProps = useLocation();
  if (state.talent === null) {
    return <p> Something went wrong. We have our best monkeys on it!</p>;
  }

  const document = state.options.two_page
    ? TwoPageDocument
    : SinglePageDocument;

  return (
    <Grid.Row columns={3}>
      <Link to="/pdf" state={state.talent} className="top-content">
        <Icon size="big" name="angle left" />
      </Link>
      <PDFViewer style={styles.viewer}>
        {document({ options: state.options, talent: state.talent })}
      </PDFViewer>
      <PDFDownloadLink
        fileName="CV.pdf"
        document={document({ options: state.options, talent: state.talent })}
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
