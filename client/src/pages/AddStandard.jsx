import { Form, useNavigation, redirect } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const form = document.querySelector("form");
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/standard", data);
    form.reset();
    toast.success(response?.data?.msg);
    return redirect("/admin/add-standard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddStandard = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <PageBanner title="Add Standard" />
      <div class="container-xxl pb-5">
        <div class="container">
          <div class="row g-5">
            <div className="col-lg-3"></div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <Form method="post">
                <div class="row g-3">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="standard" class="form-label">
                        Add Standard
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="standard"
                        placeholder="Enter Standard"
                        name="name"
                      />
                      <div class="pt-3" style={{ color: "red" }}>
                        Enter Only Number like 1,2,3,4
                      </div>
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
export default AddStandard;
