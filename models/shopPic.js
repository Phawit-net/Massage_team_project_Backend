module.exports = (sequelize, DataTypes) => {
  const shopPic = sequelize.define("shopPic", {
    picName: {
      type: DataTypes.STRING(255)
    }
  });

  return shopPic;
};
