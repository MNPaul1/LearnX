import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Landing from "./components/layout/Landing";

const App = () => (
  <Provider store={store}>
    <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="register" element={<Register />}/>
          <Route path="login" element={<Login />}/>
        </Routes>
    </Router>
  </Provider>
);

export default App;
