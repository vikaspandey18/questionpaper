import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async () => {
  try {
    const response = await axios.get("/api/activity/getstandard");
    const { standard } = response.data;
    return standard;
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
    const response = await axios.post("/api/activity/add-subject", data);
    form.reset();
    toast.success(response?.data?.msg);
    return redirect("/admin/add-subject");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddSubject = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const standards = useLoaderData();

  return (
    <>
      <PageBanner title="Add Subject" />
      <div class="container-xxl pb-5">
        <div class="container">
          <div class="row g-5">
            <div className="col-lg-3"></div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <Form method="post">
                <div class="row g-3">
                  <div class="col-md-12">
                    <div class="form-floating">
                      <select class="form-select" id="sel1" name="standard">
                        <option value="">Select Standard</option>
                        {standards.map((standard) => (
                          <option value={standard._id}>
                            {standard.name} Std
                          </option>
                        ))}
                      </select>
                      <label for="sel1" class="form-label">
                        Select Standard
                      </label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="subject" class="form-label">
                        Add Subject
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="subject"
                        placeholder="Enter Subject"
                        name="name"
                      />
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <button
                      class="btn btn-primary py-3 px-5"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Save"}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSubject;
