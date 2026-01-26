import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Redirecting() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 20000); // ⏱️ 20 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <>
      <div
        className="container bg-secondary bg-gradient d-flex justify-content-center align-items-center mx-3"
        style={{ minHeight: "60vh", marginTop: "7em" }}
      >
        <i
          className="fa-solid fa-baby fa-bounce"
          style={{ fontSize: "10rem", color: "#105f30" }}
        ></i>
        <h1>You Are Redirecting TO Login Page</h1>
      </div>
    </>
  );
}
