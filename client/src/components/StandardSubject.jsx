import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const StandardSubject = ({ subject }) => {
  return (
    <>
      <Col sm={4}>
        <Link to={`/chapter`}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <Card.Title>{subject.toUpperCase()}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
};
export default StandardSubject;
