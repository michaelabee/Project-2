var db = require("../models");

module.exports = function (app) {
  // Get all drinks
  app.get("/api/cocktails", function (req, res) {
    db.Cocktails.findAll({}).then(function (dbCocktails) {
      res.json(dbCocktails);
    });
  });

  // Create a new drink
  app.post("/api/cocktails", function (req, res) {
    db.Cocktails.create(req.body).then(function (dbCocktails) {
      res.json(dbCocktails);
    });
  });

  // Delete an drink by id
  app.delete("/api/cocktails/:id", function (req, res) {
    db.Cocktails.destroy({ where: { id: req.params.id } })
      .then(function (dbCocktails) {
        res.json(dbCocktails);
      });
  });
};
