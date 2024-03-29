import "./App.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import BootcampLayout from "./components/bootcampLayout/BootcampLayout";
import PrivateRoute from "./components/routing/PrivateRoute";
import ResourceLayout from "./components/resourceLayout/ResourceLayout";
import { Footer } from "./components/layout/Footer";
import CreateBootcamp from "./components/bootcampLayout/CreateBootcamp";
import CoursesLayout from "./components/resourceLayout/CoursesLayout";
import CourseLayout from "./components/courseLayout/CourseLayout";
import AllReviews from "./components/reviews/AllReviews";
import UpdateReview from "./components/reviews/UpdateReview";
import ProfileLayout from "./components/Profile/ProfileLayout";
import UserSettings from "./components/Profile/UserSettings";
import UsersSettings from "./components/Profile/UsersSettings";
import MyBootcamps from "./components/bootcampLayout/MyBootcamps";
import ResourceSettings from "./components/layout/ResourceSettings";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ResponsiveAppBar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="bootcamps" element={<ResourceLayout />} />
          <Route path="courses" element={<CoursesLayout />} />
          <Route
            path="course/:id"
            element={<PrivateRoute component={CourseLayout} />}
          />
          <Route
            path="bootcamp/:id"
            element={<PrivateRoute component={BootcampLayout} />}
          />
          <Route
            path="add-bootcamp"
            element={<PrivateRoute component={CreateBootcamp} />}
          />
          <Route
            path="bootcamp-settings/:id"
            element={<PrivateRoute component={ResourceSettings} />}
          />
          <Route
            path="/course-settings/:id"
            element={<PrivateRoute component={ResourceSettings} />}
          />
          <Route
            path="/reviews"
            element={<PrivateRoute component={AllReviews} />}
          />
          <Route
            path="/review/:id"
            element={<PrivateRoute component={UpdateReview} />}
          />
          <Route
            path="/user/:id"
            element={<PrivateRoute component={ProfileLayout} />}
          />
          <Route
            path="/user-settings/:id"
            element={<PrivateRoute component={UserSettings} />}
          />
          <Route
            path="/users-settings"
            element={<PrivateRoute component={UsersSettings} />}
          />
          <Route
            path="/my-bootcamps"
            element={<PrivateRoute component={MyBootcamps} />}
          />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
