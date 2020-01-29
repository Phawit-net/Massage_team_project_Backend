'use strict';
// npx sequelize db:seed:all
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('addresses', [
      {
        address:"229-237 Thanon Phra Sumen, Khwaeng Talat Yot, Khet Phra Nakhon, Krung Thep Maha Nakhon 10200",
        latitude:13.761339,
        longitude:100.499360,
        shop_id:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address:"Itsaraphap 29, Wat Tha Phra, Bangkok Yai, Bangkok 10600",
        latitude:13.741197,
        longitude:100.483214,
        shop_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address:"Thanon Phet Kasem, Lak Song, Khet Bang Khae, Krung Thep Maha Nakhon 10160",
        latitude:13.709637,
        longitude:100.397111,
        shop_id:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

};
