module.exports = (sequelize, DataTypes) => {
  const historyStatement = sequelize.define("historyStatement", {
    numberOfUser: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT(2)
    },
    startTime: {
      type: DataTypes.FLOAT(2)
    },
    endTime: {
      type: DataTypes.FLOAT(2)
    },
    date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("waitingApprove", "Approve", "Approve30%")
    },
    paymentMethod: {
      type: DataTypes.ENUM("pay30%", "payFullPrice")
    },
    attend: {
      type: DataTypes.ENUM("Yes", "No")
    },
    paymentImage: {
      type: DataTypes.STRING(255)
    },
    serviceName: {
      type: DataTypes.STRING(255)
    },
    shopName: {
      type: DataTypes.STRING(255)
    }
  });

  historyStatement.associate = models => {
    historyStatement.belongsTo(models.shop, {
      onDelete: "CASCADE",
      foreignKey: "shop_id"
    });
    
  };

  return historyStatement;
};
