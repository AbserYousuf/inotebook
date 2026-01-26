import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notestate from "./context/notes/Notestate";
import About from "./components/About";
import Alert from "./components/Alert";
import AddNotes from "./components/AddNotes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Redirecting from "./components/Redirecting";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
function App() {
  const [progress12, setprogress12] = useState(0);
  const loading = (progress) => {
    setprogress12(progress);
  };
  return (
    <>
      <Notestate>
        <Navbar loading={loading} />
        <Alert />
        <LoadingBar color="#f11946" height={3} progress={progress12} />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Auth & App Pages */}
          <Route
            path="/login"
            element={
              <div className="container">
                <Login />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="container">
                <Signup />
              </div>
            }
          />
          <Route
            path="/add"
            element={
              <div className="container">
                <AddNotes />
              </div>
            }
          />
          <Route
            path="/redirect"
            element={
              <div className="container">
                <Redirecting />
              </div>
            }
          />
        </Routes>
      </Notestate>
    </>
  );
}

export default App;
