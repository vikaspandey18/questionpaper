const Footer = () => {
  return (
    <>
      <div
        class="container-fluid bg-dark footer pt-1 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div class="container py-5">
          <div class="row g-5">
            <div class="col-md-6">
              <h1 class="text-white mb-4">Question</h1>
              <span>
                Welcome to our platform, your one-stop solution for crafting
                quality assessments. Join us in transforming education, one
                question paper at a time.
              </span>
            </div>
            <div class="col-md-6">
              <h5 class="text-light mb-4">Newsletter</h5>
              <p>
                Subscribe for getting latest information about Question Paper
                first.
              </p>
              <div class="position-relative">
                <input
                  class="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid copyright">
          <div class="container">
            <div class="row">
              <div class="col-md-6  mb-3 mb-md-0">
                &copy; {new Date().getFullYear()} Question Paper, All Right
                Reserved.
              </div>
              <div class="col-md-6  mb-3 mb-md-0">
                <div class="d-flex justify-content-end">
                  <a class="btn btn-square rounded-circle me-1" href="">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a class="btn btn-square rounded-circle me-1" href="">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a class="btn btn-square rounded-circle me-1" href="">
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a class="btn btn-square rounded-circle me-1" href="">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#"
        class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i class="bi bi-arrow-up"></i>
      </a>
    </>
  );
};
export default Footer;
