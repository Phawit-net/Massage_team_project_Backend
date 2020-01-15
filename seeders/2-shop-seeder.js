'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('shops', [
      {
        shopName: "nuadthai",
        shopDescription: "We offer you the best in different types of Thai massage and reflexology in middlesex London. \
        Traditional Thai massage is a combination of acupressure, reflexology and yogic exercises, or gentle stretching, \
        which manipulates the energy lines and so diminishes tension, stimulates metabolism and creates a feeling of wellbeing and vitality. \
        Unlike some other therapies, you will feel refreshed and energized after a Thai massage, rather than sedated and lethargic. \
        Our Thai Therapists have been trained at the world famous “Wat Poh” academy at the Royal palace in Bangkok and \
        therefore we  trust  you will have  a wonderful experience of royal thai massage in the modern and busy City of London.",
        shopProfilePic: "https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg",
        shopAccountNo: "",
        shopAccountName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 1,
      },
      {
        shopName: "letsrelaxspa",
        shopDescription: "Get immersed into the local culture. Each branch has its own unique design that reflects the city's unique background\
        Get in the peaceful mood.. by the scent of natural essential oil, and the sound of ambiance music exclusive to Let's Relax Spa\
        Feel the stress-relieving touch, by well-trained and experienced therapists\
        From always-clean bedsheet to the natural herbs and oil used on your skin, we only use natural products of highest quality.\
        All Let's Relax Spa customers are welcomed with Thai herbal drink and end with a delightful taste of Thai snacks",
        shopProfilePic: "",
        shopAccountNo: "",
        shopAccountName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 2,
      },
      {
        shopName: "thaisquarespa",
        shopDescription: "THE FIRST EVER SPA WITH THAI THERAPUETIC HERITAGE EMBRACING TURKISH AND ROMAN INFLUENCES\
        With the eclectic mix of Thai, Roman, and Turkish spa décor element, the new Thai Square Spa is designed to be a haven tranquillity,\
        a caring and peaceful environment to nurture the spirit of modern life.\
        Influences of the east are reflected within the décor of rich Thai silk, traditional wood carvings and gold murals,\
        all of which have been lovingly hand-selected to adorn the historical building, previously Turkish bath.\
        Thai Square Spa has sensitively refurbished the baths and will provide a luxurious and tranquil space, where the mind, body and spirit can relax and renew",
        shopProfilePic: "",
        shopAccountNo: "",
        shopAccountName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 3,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    // return queryInterface.bulkDelete('shops', null, {});

  }
};
