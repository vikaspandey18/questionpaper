import React, { forwardRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Paper = forwardRef(({ allquestions, handlePrint }, ref) => {
  const { school, questions } = allquestions;

  const date = new Date();
  const istDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = istDate.toLocaleDateString("en-IN", dateOptions);

  return (
    <>
      {allquestions && (
        <Card ref={ref} style={{ margin: "20px" }}>
          <Card.Header>
            <h6 className="text-center">{school && school.schoolname}</h6>
            <p className="text-center mb-1">English Paper</p>
            <p className="d-flex justify-content-between mb-1">
              <span>Marks : 10</span>
              <span>Date: {formattedDate}</span>
            </p>
          </Card.Header>
          {questions &&
            questions.map((question, index) => (
              <Card.Body>
                <Card.Title key={index}>
                  {question.questions[index].typeofquestion}
                </Card.Title>

                <Card.Text>
                  {question.questions[index].text}
                  {question.questions[index].options.map((option, index) => (
                    <p className="mb-0">
                      {String.fromCharCode(65 + index)} ) {option}
                    </p>
                  ))}
                </Card.Text>
              </Card.Body>
            ))}
        </Card>
      )}
      <Button variant="primary" className="mt-3 text-end" onClick={handlePrint}>
        Print
      </Button>
    </>
  );
});

export default Paper;
