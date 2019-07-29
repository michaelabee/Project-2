module.exports = function(sequelize, DataTypes) {
  var Cocktails = sequelize.define("Cocktails", {
    name: DataTypes.STRING,
    ingrOne: DataTypes.STRING,
    ingrTwo: DataTypes.STRING,
    ingrThree: DataTypes.STRING,
    ingrFour: DataTypes.STRING,
    ingrFive: DataTypes.STRING,
    ingrSix: DataTypes.STRING,
    description: DataTypes.TEXT,
    alcoholic: DataTypes.BOOLEAN,
    favorite: DataTypes.BOOLEAN
  });
  return Cocktails;
};
