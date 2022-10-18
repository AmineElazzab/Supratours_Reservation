const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/usersRoute');

app.use('/api/users', usersRoute);
app.listen(port, () => console.log(`Node server Listening on port ${port}`));