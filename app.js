// set mongoose, method-override, express, router and port
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const router = require('./routes')

// mongoDB
require('./config/mongoose')

// set handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import bootstrap, popper, method-override, routers and URL encoder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(router)

// online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`);
});
