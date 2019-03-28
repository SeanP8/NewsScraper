const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const route = require("./routes/routes");
const MONGODB_URI = require("./keys")

var db = require("./models");
const PORT = process.env.PORT || 4000;

const app = express();
// app.use(logger("dev"));
const router = express.Router();

app.use(express.static(__dirname + "/public"));
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

var production = MONGODB_URI || "mongodb://localhost/newsScraper";

mongoose.connect(production, { useNewUrlParser: true });

app.use("/", route);



app.listen(PORT, function() {
  console.log("Listening on http://localhost:" + PORT);
});
