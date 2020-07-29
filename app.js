const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/results", function (req, res) {
  var query = req.query.search;
  var url = "http://www.omdbapi.com/?apikey=48aebad&s=" + query;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Movie app has started");
});
