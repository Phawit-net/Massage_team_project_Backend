module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(255)
    },
    password: {
      type: DataTypes.STRING(255)
    },
    roles: {
      type: DataTypes.ENUM("admin", "seller", "buyer")
    },
    firstname: {
      type: DataTypes.STRING(255)
    },
    lastname: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    tel: {
      type: DataTypes.STRING(20)
    },
    photoProfile: {
      type: DataTypes.STRING(255)
    },
    resetPasswordToken:{
      type:DataTypes.STRING(255)
    },
    resetPasswordExpires:{
      type:DataTypes.BIGINT
    }
  });

  user.associate = models => {
    user.hasMany(models.shop, { onDelete: "CASCADE", foreignKey: "user_id" });
    user.hasMany(models.historyStatement, {
      onDelete: "CASCADE",
      foreignKey: "user_id"
    });

  };
  return user;
};
