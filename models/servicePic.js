module.exports = (sequelize, DataTypes) => {
    const servicePic = sequelize.define("servicePic", {
      picName: {
        type: DataTypes.STRING(255)
      },
      
      
    });
  
    return servicePic
  };
  