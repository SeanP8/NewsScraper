let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models/");
let app = express();

app.get("/scrape", function(req, res) {
  axios.get("http://www.nytimes.com").then(function(response) {
    let $ = cheerio.load(response.data);

    $(".css-6p61n1").each(function(i, element) {
      let result = {};
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Headline.create(result).then;
    });
  });
});
