import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/auth/login", data);
    toast.success(response?.data?.msg);
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-3"></div>
            <div class="col-lg-6 pb-4 wow fadeIn border">
              <h1 class="display-6 mt-5 mb-4 text-center">Login</h1>
              <Form method="post">
                <div class="row g-3">
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Your Email"
                        name="email"
                        required
                      />
                      <label for="email">Your Email</label>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="pwd"
                        placeholder="Enter password"
                        name="password"
                        required
                      />
                      <label for="pwd">Your Password</label>
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <button
                      class="btn btn-primary py-3 px-5"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Login"}
                    </button>
                  </div>
                  <div className="col-12">
                    <p className="text-center">
                      Don't have an Account ?{" "}
                      <Link to={`/register`}>Sign Up</Link>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
            <div class="col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
