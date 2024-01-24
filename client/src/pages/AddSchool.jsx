import { Form, useNavigation, redirect } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formdata = await request.formData();
  try {
    const response = await axios.post("/api/activity/addschool", formdata);
    toast.success(response?.data?.msg);
    return redirect("/add-school");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddSchool = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <PageBanner title="Add School" />
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div className="col-lg-3"></div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <Form method="post" encType="multipart/form-data">
                <div class="row g-3">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="name" class="form-label">
                        Enter School Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Enter School Name"
                        name="schoolname"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="formFile" class="form-label">
                        Logo
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        name="schoolfile"
                        id="formFile"
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
export default AddSchool;
