module.exports = (sequelize, Datatypes) => {
  const address = sequelize.define("address", {
    address: {
      type: Datatypes.STRING(255)
    },
    latitude: {
      type: Datatypes.DECIMAL(10,6)
    },
    longitude: {
      type: Datatypes.DECIMAL(10,6)
    }
  });

  return address
}