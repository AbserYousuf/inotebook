const Connection = require("./database");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const notes = require("./routes/notes");
const auth = require("./routes/auth");

const app = express();

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: "http://localhost:3000", // OK for now (we'll change on deploy)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "authtoken",
      "auth-token",
      "authorization",
    ],
    credentials: true,
  }),
);

app.use(express.json());

/* ---------- API Routes ---------- */
app.use("/api/auth", auth);
app.use("/api/notes", notes);

/* ---------- Serve React ---------- */
app.use(express.static(path.join(__dirname, "../react/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react/build/index.html"));
});

/* ---------- Server ---------- */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`inotebook is listening on port ${port}`);
});

/* ---------- DB ---------- */
Connection();
