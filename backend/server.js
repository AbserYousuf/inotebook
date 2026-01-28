const Connection = require("./database");
require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const notes = require("./routes/notes");
const auth = require("./routes/auth");
const app = express();
const Client_Port = process.env.FRONT_END
/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: Client_Port,// OK for now (we'll change on deploy)
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
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

/* ---------- Server ---------- */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`inotebook is listening on port ${port}`);
});

/* ---------- DB ---------- */
Connection();
