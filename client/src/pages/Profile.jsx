import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async () => {
  try {
    const response = await axios.get("/api/user");
    const { user } = response.data;
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/login");
  }
};

export const action = async ({ request }) => {
  const formdata = await request.formData();
  try {
    const response = await axios.patch("/api/user/updateuser", formdata);
    toast.success(response?.data?.msg);
    return redirect("/profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Profile = () => {
  const user = useLoaderData();
  console.log(user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <PageBanner title="Profile" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12 wow fadeIn" data-wow-delay="0.1s">
              <Form method="post" encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        defaultValue={user.name}
                        name="name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        defaultValue={user.email}
                        name="email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        placeholder="Your Mobile No"
                        defaultValue={user.mobile}
                        name="mobile"
                      />
                      <label htmlFor="email">Your Mobile No</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="gender">Gender</label>
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="radio1"
                        name="gender"
                        value="male"
                        defaultChecked={user.gender === "male" ? true : false}
                      />
                      Male
                      <label class="form-check-label" for="radio1"></label>
                    </div>
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="radio2"
                        name="gender"
                        value="female"
                        defaultChecked={user.gender === "female" ? true : false}
                      />
                      Female
                      <label class="form-check-label" for="radio2"></label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="formFile" class="form-label">
                        Profile Pic
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        name="image"
                        id="formFile"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <img
                      src={`http://localhost:5000/users/${user.image}`}
                      style={{ width: "150px" }}
                      alt=""
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary py-3 px-5"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Profile"}
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
export default Profile;
