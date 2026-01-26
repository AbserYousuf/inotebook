import React from "react";
export default function About() {
  return (
    <>
      <>
        <div
          className="bg-dark d-flex justify-content-center align-items-center position-relative"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <img
            src="https://pngmagic.com/webp_images/light-blue-website-background-image.webp"
            alt="Notebook"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              opacity: 0.3, // optional for readability
            }}
          />

          {/* Content Above Image */}
          <div
            className="container d-flex justify-content-center flex-column text-center"
            style={{
              zIndex: 2,
            }}
          >
            <h1 className="fw-semibold text-white">About Us – Notebook</h1>

            <p className="fw-semibold text-white">
              At Notebook, we believe that ideas are powerful — but only when
              they are captured, organized, and protected. In a fast-moving
              digital world where thoughts come and go in seconds, Notebook
              exists to make sure nothing important is ever lost. We are more
              than just a note-taking platform; we are a space where clarity
              meets simplicity and productivity becomes effortless. Notebook was
              built with one simple goal in mind: to create a secure, intuitive,
              and user-friendly platform where anyone can store their thoughts,
              plans, and knowledge without distractions. Whether you are a
              student managing academic notes, a developer documenting ideas, a
              professional tracking tasks, or a creative writing down
              inspiration, Notebook adapts to your workflow.
            </p>
            <h1 className="fw-semibold text-white">Why Notebook?</h1>
            <p className="fw-semibold text-white">
              In a world full of complex tools, Notebook stands out by keeping
              things simple, fast, and reliable. We believe productivity doesn’t
              come from more features, but from the right features. With secure
              authentication, personalized access, and seamless note management,
              your notes remain private, organized, and always within reach.
              Your data matters to us. Privacy and security are not optional —
              they are foundational. Notebook ensures that each user sees only
              their own notes, maintaining strict data isolation and secure
              handling of information. Your thoughts belong to you, and we take
              that responsibility seriously.
            </p>
            <h1 className="fw-semibold text-white">
              Built for Growth, Designed for You
            </h1>
            <p className="fw-semibold text-white">
              Notebook is designed to grow with you. As your ideas expand, your
              notes evolve, and your goals change, Notebook remains a dependable
              companion. The platform is constantly improving, guided by real
              user needs and modern development practices. We are passionate
              about building technology that empowers users rather than
              confusing them. Notebook is built using modern web technologies to
              ensure performance, scalability, and reliability — so you can
              focus on thinking, creating, and achieving, while we handle the
              rest.
            </p>
          </div>
        </div>
      </>
    </>
  );
}
