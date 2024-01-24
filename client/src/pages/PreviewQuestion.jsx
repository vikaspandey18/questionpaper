import PageBanner from "../components/PageBanner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Paper from "./Paper";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const loader = async () => {
  try {
    const response = await axios.get("/api/activity/loadschool");
    const { schools } = response.data;
    return schools;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/add-school");
  }
};

// export const action = async ({ request }) => {
//   const form = document.querySelector("form");
//   const formdata = await request.formData();
//   const data = Object.fromEntries(formdata);
//   try {
//     const response = await axios.post("/api/activity/generatetemplate", data);
//     const newdata = response.data;
//     form.reset();
//     return newdata;
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return error;
//   }
// };

const PreviewQuestion = () => {
  // const allquestions = useActionData();
  const schools = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [allquestions, setAllquestions] = useState({});
  const [getquestions, setGetquestions] = useState(null);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("/api/activity/generatetemplate", {
        school: getquestions,
      })
      .then((response) => setAllquestions(response.data))
      .catch((error) => toast.error(error?.response?.data?.msg));
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <PageBanner title="All Template" />
      <Container>
        <Row className="mb-5">
          <Col md={4}>
            <h4>Add School</h4>
            <form method="post" onSubmit={SubmitHandler}>
              <div className="form-group">
                <select
                  className="form-control"
                  name="school"
                  onChange={(event) => setGetquestions(event.target.value)}
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school._id} value={school._id}>
                      {school.schoolname}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Generate Template"}
              </button>
            </form>
          </Col>
          <Col md={8}>
            <Paper
              allquestions={allquestions}
              ref={componentRef}
              handlePrint={handlePrint}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PreviewQuestion;
