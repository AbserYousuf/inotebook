export default function Home() {
  return (
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
          src="https://cdn.prod.website-files.com/5f7ece8a7da656e8a25402bc/631f32ee984371cb97df4ce2_How%20to%20take%20notes%20from%20a%20textbook.webp"
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
          <h1 className="fw-semibold text-primary-emphasis">
            Welcome to INotebook
          </h1>

          <p className="fw-semibold text-white">
            INotebook, we believe that ideas are powerful — but only when they
            are captured, organized, and protected. In a fast-moving digital
            world where thoughts come and go in seconds, Notebook exists to make
            sure nothing important is ever lost. We are more than just a
            note-taking platform; we are a space where clarity meets simplicity
            and productivity becomes effortless.
          </p>
          <h1 className="fw-semibold text-primary-emphasis">
            Think Freely. Write Instantly.
          </h1>
          <p className="fw-semibold text-white">
            Great ideas don’t wait — and neither should you. Notebook is
            designed for speed and simplicity, so you can start writing the
            moment inspiration strikes. No clutter. No unnecessary steps. Just
            you and your notes. From quick thoughts to detailed documents,
            Notebook adapts to your style. Create, edit, and manage notes
            effortlessly with an interface that feels natural from the first
            click.
          </p>
          <h1 className="fw-semibold text-primary-emphasis">
            Organized, Always
          </h1>
          <p className="fw-semibold text-white">
            Notes should work for you, not against you. Notebook helps you stay
            organized without forcing complexity. Your notes are easy to access,
            neatly structured, and available whenever you need them. Whether
            you’re managing daily tasks, exam notes, project ideas, or personal
            reflections, Notebook keeps everything in order — so your mind stays
            clear and focused.
          </p>
        </div>
      </div>
    </>
  );
}
