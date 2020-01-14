'use strict';
// npx sequelize db:seed:all
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: "nuadthai",
        password: "$2y$12$JzLaKRL45fRXXsa2tIEUsuprRV7XZM4VXv0nML5/MvRCYmtyCuNA6",
        roles: "seller",
        firstname: "nuadthai",
        lastname: "massage",
        email: "nuadthai@hotmail.co.th",
        tel: "0811112222",
        photoProfile: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "letsrelaxspa",
        password: "$2y$12$h691LbyV5qwh6bmfXnpNDOTzd5JjWEl63iLXqge8/DAmTE3r54eJ2",
        roles: "seller",
        firstname: "letsrelaxspa",
        lastname: "massage",
        email: "letsrelaxspa@hotmail.co.th",
        tel: "0811113333",
        photoProfile: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "thaisquarespa",
        password: "$2y$12$qfh5FFvodqxmgOEVfj.vquKkNNzz5v6sM6KO5VFjy.IeGFQDWszMO",
        roles: "seller",
        firstname: "thaisquarespa",
        lastname: "massage",
        email: "thaisquarespa@hotmail.co.th",
        tel: "0811114444",
        photoProfile: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    // queryInterface.bulkDelete('users', null, {})

  }
};
