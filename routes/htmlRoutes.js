var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Cocktails.findAll({}).then(function(results) {
      res.render("index", {
        msg: "Welcome to our drink app!",
        examples: results
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.findOne({ where: { id: req.params.id } }).then(function(results) {
      res.render("example", {
        example: results
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
