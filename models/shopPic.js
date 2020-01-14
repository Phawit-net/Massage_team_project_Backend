module.exports = (sequelize, DataTypes) => {
  const shopPic = sequelize.define("shopPic", {
    picName: {
      type: DataTypes.STRING(255)
    }
  });

  shopPic.associate = models => {
    shopPic.belongsTo(models.shop, { onDelete: "CASCADE", foreignKey: "shop_id" });
    
  };

  return shopPic;
};
