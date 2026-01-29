import React, { useState } from "react";
import LoginAlert from "./LoginAlert";
import { useNavigate } from "react-router";
const host = process.env.REACT_APP_API_URL;
export default function Login() {
  const [message, setmessage] = useState(null);
  const [issuccess, setissuccess] = useState(false);
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleChange = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value });
  };
  const send = () => {
    Navigate('/recovery')
  }
  const handlesubmit = async (event) => {
    const { email, password } = input;
    console.log("clicked");
    event.preventDefault();
    if (email === "" && password === "") {
      setissuccess(false);
      setmessage("Please Enter Email and password First");
      setissuccess(false);
      return;
    } else if (email === "") {
      setissuccess(false);
      setmessage("Please Enter Email First");
      return;
    } else if (password === "") {
      setissuccess(false);
      setmessage("Please Enter password First");
      return;
    }
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (response.ok) {
      setissuccess(json.success);
      setmessage(json.message);
      localStorage.setItem("token", json.authtoken);
      setTimeout(() => {
        Navigate("/add");
      }, 5000);
    }
    setmessage(json.message);
    setissuccess(json.success);
  };
  return (
    <>
      <LoginAlert
        message={message}
        success={issuccess}
        updatemessage={setmessage}
      />
      <section
        className=" container d-flex justify-content-center align-items-center "
        style={{ minHeight: "80vh" }}
      >
        <div className="container-fluid h-custom">
          <div className="container d-flex justify-content-center ">
            <h1>Log In</h1>
          </div>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">

              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handlesubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={input.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-body" onClick={send} style={{ position: "relative", left: "15em", bottom: "2em", cursor: "pointer" }}>Forgot password?</span>
                </div>
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                  style={{ paddingleft: " 2.5rem; padding-right: 2.5rem" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
