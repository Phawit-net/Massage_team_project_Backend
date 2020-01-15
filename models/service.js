module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define("service", {
    serviceName: {
      type: DataTypes.STRING(255)
    },
    serviceDescription: {
      type: DataTypes.TEXT
    },
    serviceProfilePic: {
      type: DataTypes.STRING(255)
    },
    time: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT(2)
    }
  });

  service.associate = models => {
    service.hasMany(models.servicePic, {
      onDelete: "CASCADE",
      foreignKey: "service_id"
    });

    service.hasMany(models.historyStatement, {
      onDelete: "CASCADE",
      foreignKey: "service_id"
    });

    service.belongsTo(models.shop, { onDelete: "CASCADE", foreignKey: "shop_id" });
  };
  return service;
};
