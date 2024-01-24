import { Form, redirect, useLoaderData } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { Questiontype } from "../../utils/questionType";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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
    const response = await axios.post(
      "/api/activity/generatequestion",
      formdata
    );
    form.reset();
    toast.success(response.data.msg);
    return redirect("/admin/generate-question");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const GenerateQuestion = () => {
  const { chapters, subjects, standards } = useLoaderData();
  const [getstandard, setGetStandard] = useState(null);
  const [getsubject, setGetSubject] = useState([]);
  const [getcurrentsubject, setCurrentSubject] = useState();
  const [getchapter, setGetchapter] = useState([]);

  useEffect(() => {
    if (getstandard) {
      axios
        .get(`/api/activity/getsubjects/${getstandard}`)
        .then((respones) => setGetSubject(respones.data.subject))
        .catch((error) => toast.error(error.response.data.msg));
    }
  }, [getstandard]);

  useEffect(() => {
    if (getstandard && getcurrentsubject) {
      axios
        .get(`/api/activity/getchapter/${getstandard}/${getcurrentsubject}`)
        .then((response) => setGetchapter(response.data.chapter))
        .catch((error) => toast.error(error.response.data.msg));
    }
  }, [getstandard, getcurrentsubject]);

  return (
    <>
      <PageBanner title="Generate Question Paper" />
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-12 wow fadeIn" data-wow-delay="0.1s">
              <Form method="post">
                <div class="row g-3">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label htmlFor="text">Your Question</label>
                      <input
                        type="text"
                        class="form-control"
                        id="text"
                        placeholder="Enter Question Name"
                        name="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label htmlFor="text">Select Question Type</label>
                      <select
                        name="typeofquestion"
                        className="form-control"
                        required
                      >
                        <option value="">Select Type</option>
                        {Questiontype.map((question, index) => (
                          <option key={index} value={question}>
                            {question}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <label htmlFor="options">Enter Options A</label>
                      <input
                        type="text"
                        class="form-control"
                        id="options"
                        placeholder="Option A"
                        name="options[]"
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <label>Enter Options B</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Option B"
                        name="options[]"
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <label>Enter Options C</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Option C"
                        name="options[]"
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <label>Enter Options D</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Option D"
                        name="options[]"
                      />
                    </div>
                  </div>
                  <div class="col-md-4"></div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Enter Correct Answer</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter the Correct Answer"
                        name="correctanswer"
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label htmlFor="text">Select Standard</label>
                      <select
                        name="standard"
                        className="form-control"
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
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label htmlFor="text">Select Subject</label>
                      <select
                        name="subject"
                        className="form-control"
                        defaultValue={getcurrentsubject}
                        onChange={(event) =>
                          setCurrentSubject(event.target.value)
                        }
                      >
                        <option value="">Select Subject</option>
                        {getsubject.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label htmlFor="text">Select Chapter</label>
                      <select name="chapter" className="form-control">
                        <option value="">Select Chapter</option>
                        {getchapter.map((chapter) => (
                          <option key={chapter._id} value={chapter._id}>
                            {chapter.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-12 mt-5 text-center">
                    <button class="btn btn-primary py-3 px-5" type="submit">
                      Generate Question
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GenerateQuestion;
