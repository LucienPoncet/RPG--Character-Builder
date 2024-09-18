require('dotenv').config();
const cors = require('cors');

const express = require('express');

const app = express();

const port = process.env.PORT ?? 3000;

const router = require('./app/routers');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/",router);

app.listen(port, () => {
  console.log(`RPG Character Builder is running on http://localhost:${port}`);
});