import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PageBanner from "../components/PageBanner";
import StandardSubject from "../components/StandardSubject";

const Subject = () => {
  return (
    <>
      <PageBanner title="Select Subject" />
      <Container>
        <Row>
          <StandardSubject subject="English" />
        </Row>
      </Container>
    </>
  );
};
export default Subject;
