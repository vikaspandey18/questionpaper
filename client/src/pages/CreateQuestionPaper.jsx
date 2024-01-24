import PageBanner from "../components/PageBanner";
import Standard from "../components/Standard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import QuestionView from "./QuestionView";
import { Questiontype } from "../../utils/questionType";

export const loader = async () => {
  try {
    const response = await axios.get("/api/activity/getalldivision");
    const { data } = response;
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request }) => {
  const form = document.querySelector("form");
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/getquestions", data);
    const { questions } = response.data;
    //form.reset();
    return questions;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

const CreateQuestionPaper = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { chapters, subjects, standards } = useLoaderData();

  const [getstandard, setGetStandard] = useState();
  const [getsubject, setGetSubject] = useState([]);
  const [getcurrentSubject, setCurrentSubject] = useState();
  const [getchpater, setChpaters] = useState([]);
  const [getquestions, setQuestions] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getstandard) {
      axios
        .get(`/api/activity/getsubjects/${getstandard}`)
        .then((response) => setGetSubject(response.data.subject))
        .catch((error) => toast.error(error.response.data.msg));
    }
  }, [getstandard]);

  useEffect(() => {
    if (getstandard && getcurrentSubject) {
      axios
        .get(`/api/activity/getchapter/${getstandard}/${getcurrentSubject}`)
        .then((response) => setChpaters(response.data.chapter))
        .catch((error) => toast.error(error.response.data.msg));
    }
  }, [getstandard, getcurrentSubject]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/activity/createtemplate", {
        questions: getquestions,
      });
      toast.success(response.data.msg);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setIsLoading(false);
    }
  };

  const questions = useActionData();

  return (
    <>
      <PageBanner title="Create Question Paper" />
      <Container>
        <Row>
          <Col>
            <div className="text-end">
              <Link to={`/admin/add-standard`} className="btn btn-primary">
                Add Standard
              </Link>
              &nbsp;
              <Link to={`/admin/add-subject`} className="btn btn-primary">
                Add Subject
              </Link>
              &nbsp;
              <Link to={`/admin/add-chapter`} className="btn btn-primary">
                Add Chapter
              </Link>
              &nbsp;
              <Link to={`/admin/generate-question`} className="btn btn-success">
                Create Quesition Paper
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Form method="post">
              <div class="col-md-12 mb-2">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="sel1"
                    name="standard"
                    onChange={(event) => setGetStandard(event.target.value)}
                    defaultValue={getstandard}
                  >
                    <option value="">Select Standard</option>
                    {standards.map((standard) => (
                      <option key={standard._id} value={standard._id}>
                        {standard.name} Std
                      </option>
                    ))}
                  </select>
                  <label for="sel1" class="form-label">
                    Select Standard
                  </label>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="sel2"
                    name="subject"
                    onChange={(event) => setCurrentSubject(event.target.value)}
                    defaultValue={getcurrentSubject}
                  >
                    <option value="">Select Subject</option>
                    {getsubject.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <label for="sel2" class="form-label">
                    Select Subject
                  </label>
                </div>
              </div>

              <div class="col-md-12 mb-2">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="sel3"
                    name="chapter"
                    defaultValue={getchpater}
                  >
                    <option value="">Select Chapter</option>
                    {getchpater.map((chapter) => (
                      <option key={chapter._id} value={chapter._id}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                  <label for="sel3" class="form-label">
                    Select Chapter
                  </label>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div class="form-floating">
                  <select class="form-select" id="sel4" name="typeofquestion">
                    <option value="">Select Question</option>
                    {Questiontype.map((question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                  <label for="sel4" class="form-label">
                    Select Type of Question
                  </label>
                </div>
              </div>

              <div class="col-sm-12 text-center mb-3">
                <button
                  class="btn btn-primary py-2 px-5 btn-block"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Search"}
                </button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <QuestionView
              questions={questions}
              getquestions={getquestions}
              setQuestions={setQuestions}
            />
          </Col>
        </Row>
      </Container>
      <Navbar expand="lg" className="bg-body-tertiary " sticky="bottom">
        <Container className="justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {isloading ? "Loading..." : "SAVE"}
          </button>
          <Link to="/preview-template" className="btn btn-warning mx-2">
            PREVIEW
          </Link>
        </Container>
      </Navbar>
    </>
  );
};
export default CreateQuestionPaper;
