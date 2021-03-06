module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define("shop", {
    shopName: {
      type: DataTypes.STRING(255)
    },
    shopDescription: {
      type: DataTypes.TEXT
    },
    shopProfilePic: {
      type: DataTypes.STRING(255)
    },
    shopBank: {
      type: DataTypes.STRING(50)
    },
    shopAccountNo: {
      type: DataTypes.STRING(255)
    },
    shopAccountName: {
      type: DataTypes.STRING(255)
    },
    shopBank: {
      type: DataTypes.STRING(255)
    }
  });

  shop.associate = models => {
    shop.hasMany(models.shopPic, { onDelete: "CASCADE", foreignKey: "shop_id" });
    shop.hasMany(models.service, { onDelete: "CASCADE", foreignKey: "shop_id" });
    shop.hasOne(models.address, { onDelete: "CASCADE", foreignKey: "shop_id" });
    shop.hasMany(models.historyStatement, {
      onDelete: "CASCADE",
      foreignKey: "shop_id"
    });

  };
  return shop
};
