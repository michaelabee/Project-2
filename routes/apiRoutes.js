var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/cocktail", function(req, res) {
    db.Cocktails.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/cocktail", function(req, res) {
    db.Cocktails.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/cocktail/:id", function(req, res) {
    db.Cocktails.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
