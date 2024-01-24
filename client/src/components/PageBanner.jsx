const PageBanner = ({ title = "" }) => {
  return (
    <>
      <div
        class="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div class="container text-center py-0">
          <h1 class="display-4 text-white animated slideInDown mb-4">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
};
export default PageBanner;
