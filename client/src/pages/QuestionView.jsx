import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaPlus } from "react-icons/fa6";
import { useNavigation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

const QuestionView = ({ questions, getquestions, setQuestions }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handelCheckbox = (event) => {
    if (event.target.checked) {
      setQuestions([...getquestions, event.target.value]);
    } else {
      setQuestions(getquestions.filter((item) => item !== event.target.value));
    }
  };

  return (
    <>
      {questions ? (
        questions.map((question) => (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{question.text}</Card.Title>
              <Card.Text className="mb-0">
                {question.options.map((option, index) => (
                  <p className="mb-0">
                    {String.fromCharCode(65 + index)} ) {option}
                  </p>
                ))}
              </Card.Text>
              <div className="text-end">
                <input
                  type="checkbox"
                  value={question._id}
                  onChange={handelCheckbox}
                />
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Sorry No Question Found</Card.Title>
            <Card.Text>
              Kindly Use Left Side Filter to Search Question
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
export default QuestionView;
