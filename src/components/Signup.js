import { useState } from "react";
import { useNavigate } from "react-router-dom";

const host = process.env.REACT_APP_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [show, setShow] = useState(false); // you can remove this if not used elsewhere

  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    Recoveryemail: ""
  });

  const toggleVisibility = () => setShow((prev) => !prev);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password, Recoveryemail } = input;

    // Validation
    console.log(Recoveryemail)
    if (
      name.trim().length < 3 &&
      username.trim().length < 5 &&
      password.trim().length < 6
    ) {
      setMessage("Name ≥3 chars, username ≥5 chars, password ≥6 chars");
      setIsSuccess(false);
      return;
    }
    if (
      name.trim().length < 3 ||
      username.trim().length < 5 ||
      password.trim().length < 6
    ) {
      setMessage("Name ≥3 chars, username ≥5 chars, password ≥6 chars");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, Recoveryemail }),
      });

      const json = await response.json();

      if (!response.ok) {
        setMessage(json.message || "Signup failed");
        setIsSuccess(false);
        return;
      }
else{
      setMessage(json.message || "Account created successfully!");
      setIsSuccess(true);

      setTimeout(() => {
        setMessage(null); // optional: auto-hide after redirect
        navigate("/redirect");
      }, 1500); 
}
  
  // a bit longer so user sees success message
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <>
      {/* Floating alert – placed at top level */}
      {message && (
        <div
          className={`alert ${isSuccess ? "alert-success" : "alert-danger"} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow`}
          role="alert"
          style={{
            zIndex: 1050, // above most elements
            minWidth: "300px", // decent width on mobile
            maxWidth: "90vw",
          }}
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Rest of your form – unchanged */}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mt-4">
                        Sign up
                      </p>
                      <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={input.name}
                            onChange={handleInput}
                            placeholder="Your Name"
                            required
                          />
                        </div>
                        {/* Username */}
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={input.username}
                            onChange={handleInput}
                            placeholder="Username"
                            required
                          />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={input.email}
                            onChange={handleInput}
                            placeholder="Email"
                            required
                          />
                          <input
                            type="email"
                            className="form-control"
                            name="Recoveryemail"
                            value={input.Recoveryemail}
                            onChange={handleInput}
                            placeholder="RecoveryEmail"
                            required
                            style={{ position: "relative", top: "0.7em" }}
                          />
                        </div>
                        {/* Password */}
                        <div className="mb-4 position-relative">
                          <input
                            type={show ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={input.password}
                            onChange={handleInput}
                            placeholder="Password"
                            required
                          />
                          <i
                            className="fa-solid fa-eye position-absolute top-50 end-0 translate-middle-y me-3"
                            style={{ cursor: "pointer" }}
                            onClick={toggleVisibility}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          Sign up
                        </button>
                      </form>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Signup illustration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
