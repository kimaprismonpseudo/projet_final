module.exports = (sequelize, DataTypes) => {
    var Singes = sequelize.define('Singe', {
      nom: DataTypes.STRING, 
      poids: DataTypes.INTEGER,
      taille: DataTypes.INTEGER,
      enclos: DataTypes.INTEGER,
      detail: DataTypes.STRING
    });

    return Singes;
  };