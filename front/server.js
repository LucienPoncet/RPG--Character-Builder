const express = require("express");
const route = require('./public/js/router.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(express.static("public"));

const port = process.env.PORT ?? 3001;

app.use(route);

app.listen(port, () => {
  console.log(`RPG Character Builder lancé sur : http://localhost:${port}`);
});