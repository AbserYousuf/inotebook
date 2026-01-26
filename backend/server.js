const Connection = require('./database');
const express = require('express');
const cors = require('cors');           // keep this

require('dotenv').config({ path: __dirname + '/port.env' });
require('dotenv').config({ path: __dirname + '/key.env' });

const notes = require('./routes/notes');
const auth = require('./routes/auth');

const app = express();
app.use(cors())
// ── VERY IMPORTANT: CORS must come BEFORE routes ──
/*app.use(cors({
    origin: 'http://localhost:3000',  // exact frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'authtoken', 'auth-token', 'authorization'],
    credentials: true,
    optionsSuccessStatus: 204
  }));*/

// Optional safety net for OPTIONS requests


app.use(express.json());   // after cors

app.use('/api/auth', auth);
app.use('/api/notes', notes);

const port = process.env.PORT || 5000;  // fallback

app.listen(port, () => {
  console.log(`inotebook is listening on http://localhost:${port}`);
});

Connection();