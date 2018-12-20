module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      nom: DataTypes.STRING,  
      numero: DataTypes.INTEGER,
      taille: DataTypes.INTEGER,
      restant: DataTypes.INTEGER,
      detail: DataTypes.STRING
    });
  
    return Enclos;
  };