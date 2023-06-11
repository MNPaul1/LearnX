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
import DisplayLayout from "./components/displayLayout/displayLayout";
import PrivateRoute from "./components/routing/PrivateRoute";
import ResourceLayout from "./components/resourceLayout/ResourceLayout";
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
          <Route path="bootcamps" element={<PrivateRoute component={ResourceLayout} />} />
          <Route path="bootcamp/:id" element={<PrivateRoute component={DisplayLayout} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
