import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useUserContext } from "../pages/Layout";

const Navbar = () => {
  const { userid, name, logoutHandler } = useUserContext();

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
        <Link to="/" class="navbar-brand d-flex align-items-center">
          <h1 class="m-0">
            <Logo />
            Question
          </h1>
        </Link>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav bg-light pe-4 py-3 py-lg-0">
            <Link to="/" class="nav-item nav-link active">
              Home
            </Link>
            <Link to="/create-question-paper" class="nav-item nav-link">
              Create Question Paper
            </Link>

            <Link to="/contact" class="nav-item nav-link">
              Contact Us
            </Link>
            {!name && (
              <Link to="/login" class="nav-item nav-link">
                Login
              </Link>
            )}
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Admin
              </a>
              <div class="dropdown-menu bg-light border-0 m-0">
                <Link to="/admin/add-standard" class="dropdown-item">
                  Add Standard
                </Link>
                <Link to="/admin/add-subject" class="dropdown-item">
                  Add Subject
                </Link>
                <Link to="/admin/add-chapter" class="dropdown-item">
                  Add Chapter
                </Link>
              </div>
            </div>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Account
              </a>
              <div class="dropdown-menu bg-light border-0 m-0">
                <Link to="/add-school" class="dropdown-item">
                  Add School
                </Link>
                <Link to="/profile" class="dropdown-item">
                  Profile
                </Link>

                <a href="#!" class="dropdown-item" onClick={logoutHandler}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
