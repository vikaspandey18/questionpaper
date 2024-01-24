const TopBar = () => {
  return (
    <>
      <div class="container-fluid bg-dark text-white-50 py-2 px-0 d-none d-lg-block">
        <div class="row gx-0 align-items-center">
          <div class="col-lg-7 px-5 text-start">
            <div class="h-100 d-inline-flex align-items-center me-4">
              <small class="fa fa-phone-alt me-2"></small>
              <small>+012 345 6789</small>
            </div>
            <div class="h-100 d-inline-flex align-items-center me-4">
              <small class="far fa-envelope-open me-2"></small>
              <small>info@example.com</small>
            </div>
          </div>
          <div class="col-lg-5 px-5 text-end">
            <ol class="breadcrumb justify-content-end mb-0">
              <li class="breadcrumb-item">
                <a class="text-white-50 small" href="#">
                  Home
                </a>
              </li>
              <li class="breadcrumb-item">
                <a class="text-white-50 small" href="#">
                  Terms
                </a>
              </li>
              <li class="breadcrumb-item">
                <a class="text-white-50 small" href="#">
                  Privacy
                </a>
              </li>
              <li class="breadcrumb-item">
                <a class="text-white-50 small" href="#">
                  Support
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopBar;
