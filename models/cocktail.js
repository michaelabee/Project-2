module.exports = function(sequelize, DataTypes) {
  var Cocktails = sequelize.define("Cocktails", {
    name: DataTypes.STRING,
    ingrOne: DataTypes.STRING,
    ingrTwo: DataTypes.STRING,
    ingrThree: DataTypes.STRING,
    ingrFour: DataTypes.STRING,
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  })
  return Cocktails;
};


