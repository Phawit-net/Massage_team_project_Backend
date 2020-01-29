'use strict';
// npx sequelize db:seed:all
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('addresses', [
      {
        address:"248 ถนน พระสุเมรุ แขวง วัดบวรนิเวศ เขตพระนคร กรุงเทพมหานคร 10200",
        latitude:13.761339,
        longitude:100.499360,
        shop_id:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address:"ปาก อิสรภาพ29 แขวง วัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600",
        latitude:13.741197,
        longitude:100.483214,
        shop_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address:"180-584 ถนน เพชรเกษม แขวง หลักสอง เขตบางแค กรุงเทพมหานคร 10160",
        latitude:13.709637,
        longitude:100.397111,
        shop_id:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

};
