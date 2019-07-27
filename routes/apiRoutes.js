var db = require("../models");

module.exports = function(app) {
  // Get all drinks
  app.get("/api/cocktails", function(req, res) {
    db.Cocktails.findAll({}).then(function(dbCocktails) {
      res.json(dbCocktails);
    });
  });

  // Create a new drink
  app.post("/api/cocktails", function(req, res) {
    console.log(req.body);
    db.Cocktails.create({
      name: req.body.name,
      ingrOne: req.body.ingredient1,
      ingrTwo: req.body.ingredient2,
      ingrThree: req.body.ingredient3,
      ingrFour: req.body.ingredient4,
      ingrFive: req.body.ingredient5,
      ingrSix: req.body.ingredient6,
      description: req.body.description
    }).then(function(dbCocktails) {
      res.json(dbCocktails);
    });
  });

  // Delete an drink by id
  app.delete("/api/cocktails/:id", function(req, res) {
    db.Cocktails.destroy({ where: { id: req.params.id } }).then(function(
      dbCocktails
    ) {
      res.json(dbCocktails);
    });
  });
};
