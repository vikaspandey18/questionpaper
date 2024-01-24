import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Standard = ({ standard }) => {
  return (
    <>
      <Col sm={4}>
        <Link to={`/subject`}>
          <Card className="mb-4 text-center">
            <Card.Body>
              <Card.Title>{standard.toUpperCase()}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
};
export default Standard;
