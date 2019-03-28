const axios = require("axios");
let cheerio = require("cheerio");
const db = require("../models");
//

exports.scrape = (req, res, next) => {
  axios.get("http://www.techcrunch.com/").then(function(response) {
   
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    $("header h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("a")
        .text();
console.log(result);
      //   console.log(db);
      // Create a new Article using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          //   console.log(dbHeadLine);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
          res.json(err);
        });
    });

    // Send a message to the client
    next();
  });
};
exports.homepage = (req, res) => {
  db.Headline.find({}, function(err, all) {
    if (err) console.log(err);
    else res.render("home", { headline: all });
  });
};

exports.deleteHeadlines = (query, cb) => {
  db.Headline.remove(query, cb);
};
// (query,)
exports.updateHeadlines = (query, cb) => {
  db.Headline.update({ _id: query._id }, { $set: query }, {}, cb);
};
