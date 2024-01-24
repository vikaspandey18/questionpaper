import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddChapter,
  AddSchool,
  AddStandard,
  AddSubject,
  Contact,
  CreateQuestionPaper,
  ErrorPage,
  GenerateQuestion,
  Home,
  Layout,
  Login,
  PreviewQuestion,
  Profile,
  Register,
  Subject,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addschoolAction } from "./pages/AddSchool";
import { action as profileAction } from "./pages/Profile";
import { action as contactAction } from "./pages/Contact";
import { action as addstandardAction } from "./pages/AddStandard";
import { action as addsubjectAction } from "./pages/AddSubject";
import { action as addchapterAction } from "./pages/AddChapter";
import { action as generateAction } from "./pages/GenerateQuestion";
import { action as createQuestionAction } from "./pages/CreateQuestionPaper";
import { action as addquestiontemplateAction } from "./pages/SubmitQuestion";
// import { action as previewAction } from "./pages/PreviewQuestion";

import { loader as layoutLoader } from "./pages/Layout";
import { loader as subjectLoader } from "./pages/AddSubject";
import { loader as chapterLoader } from "./pages/AddChapter";
import { loader as alldivisionLoader } from "./pages/CreateQuestionPaper";
import { loader as generateLoader } from "./pages/GenerateQuestion";
import { loader as schoolLoader } from "./pages/PreviewQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
        action: contactAction,
      },
      {
        path: "create-question-paper",
        element: <CreateQuestionPaper />,
        loader: alldivisionLoader,
        action: createQuestionAction,
      },
      {
        path: "subject",
        element: <Subject />,
      },
      {
        path: "add-school",
        element: <AddSchool />,
        action: addschoolAction,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: layoutLoader,
        action: profileAction,
      },
      {
        path: "create-question-template",
        action: addquestiontemplateAction,
      },
      {
        path: "/preview-template",
        element: <PreviewQuestion />,
        loader: schoolLoader,
        // action: previewAction,
      },
      {
        path: "admin/",
        children: [
          {
            path: "add-standard",
            element: <AddStandard />,
            action: addstandardAction,
          },
          {
            path: "add-subject",
            element: <AddSubject />,
            loader: subjectLoader,
            action: addsubjectAction,
          },
          {
            path: "add-chapter",
            element: <AddChapter />,
            loader: chapterLoader,
            action: addchapterAction,
          },
          {
            path: "generate-question",
            element: <GenerateQuestion />,
            loader: generateLoader,
            action: generateAction,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
