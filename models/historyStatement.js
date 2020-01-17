module.exports = (sequelize, DataTypes) => {
  const historyStatement = sequelize.define("historyStatement", {
    numberOfUser: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT(2)
    },
    startTime: {
      type: DataTypes.STRING(20)
    },
    endTime: {
      type: DataTypes.STRING(20)
    },
    date: {
      type: DataTypes.STRING(20)
    },
    status: {
      type: DataTypes.STRING(50),
      validate:{
        isIn:[["waitingApprove", "Approve", "Approve30","Reject"]]
      }
    },
    paymentMethod: {
      type: DataTypes.ENUM("pay30", "payFullPrice")
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
    historyStatement.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "user_id"
    });
    
  };

  return historyStatement;
};
