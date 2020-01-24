'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('services', [
      {
        serviceName: "Full Body Thai Yoga massage",
        serviceDescription: "In this unique healing system of Thai Yoga Massage, also called Nuad Boran, \
        the practitioner guides the client through a series of yoga postures, while palming and thumbing along the body’s energy (‘Sen’) lines and pressure points. \
        Together these actions result in a comprehensive full body treatment that relieves muscular tension, improves circulation, \
        boosts the immune system and balances the body energetically.Thai Yoga Massage is performed on a mat on the floor; both client \
        and practitioner are dressed in comfortable clothing allowing ease of movement and flexibility.",
        serviceProfilePic: "nuadthai/Full Body Thai Yoga massage/thai-massage.jpg",
        time: 2,
        price: 114,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 1,
      },
      {
        serviceName: "Full body Thai oil massage",
        serviceDescription: "Usually performed on a table, Thai Oil Massage combines deep, firm pressure with rolling and \
        stretching movements using palms, thumbs, elbows and knees and the application of warmed Dosha oils. An invigorating, \
        rhythmic massage, it follows the style of traditional Thai massage. This massage follows eastern and \
        Ayurvedic traditions adapted perfectly for the western environment.",
        serviceProfilePic: "nuadthai/Full body Thai oil massage/Thai-oil-massage.jpg",
        time: 2,
        price: 92,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 1,
      },
      {
        serviceName: "Upper Body massage (Head, Back, Neck & Shoulders)",
        serviceDescription: "This massage involves the upper back, shoulders, neck, head and face. Head massage provide relief from aches and \
        pains and stress symptoms, promotes hair growth, soothes, comforts and re- balances skin while providing a sense of deep calmness and tranquility.",
        serviceProfilePic: "nuadthai/Upper Body massage (Head, Back, Neck & Shoulders)/thai-shoulder-massage.jpg",
        time: 45,
        price: 49,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 1,
      },
      {
        serviceName: "Upper Body massage (Head Massage)",
        serviceDescription: "A great way to get rid of a headache and any tension around the head. A Head Massage to have our therapist to work on \
        this part of your body and make you feel better and relaxed",
        serviceProfilePic: "nuadthai/Upper Body massage (Head Massage)/head-massage.jpg",
        time: 30,
        price: 38,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 1,
      },
      {
        serviceName: "Foot Reflexology",
        serviceDescription: "Reflexes in the feet and hands correspond to all of the glands, organs and parts of the body. \
        Through applying pressure and massaging these different points, \
        Reflexology is a great way to reduce stress while helping the body’s own natural healing abilities to flourish. \
        Although it is a very relaxing service, please note that it is not uncommon to feel some minor discomfort on areas which are in need of attention.",
        serviceProfilePic: "nuadthai/Foot Reflexology/foot-reflexology.jpg",
        time: 1,
        price: 59,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 1,
      },
      {
        serviceName: "Foot Massage",
        serviceDescription: "This popular massage lets you sit and relax after a long day of traveling. \
        Not only it helps relieve the tension in the lower parts of the leg, this ancient massage is believed to help \
        promote oxygenation of tissues of several major organs of the body by focusing on the reflex zones of the feet that correspond to them. \
        Other benefits include improved circulation, ease of pain and treatment of ranges of acute and chronic illnesses.",
        serviceProfilePic: "letsrelaxspa/Foot Massage/benefits-of-foot-massage.jpg",
        time: 45,
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 2,
      },
      {
        serviceName: "Hand Massage",
        serviceDescription: "It’s perfect for guests who don’t have enough time for a full-course spa or wanted to add a final touch to their spa visit. \
        Similar to foot reflexology, this is an ancient method of massaging reflex zones of the hands that correspond to individual parts of the body to \
        help promote oxygenation of tissues, improve blood circulation, ease pain and treat a wide range of acute and chronic illnesses",
        serviceProfilePic: "letsrelaxspa/Hand Massage/hand-massages.jpg",
        time: 15,
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 2,
      },
      {
        serviceName: "Warm Oil Massage",
        serviceDescription: "A great reward for a special occasion. Similar to regular aromatherapy oil massage, which utilizes essential oils from plants, \
        leaves, and flowers to massage on pressure points of the body. Yet, the heated warm oil lets our guest dive into the feeling of relaxation just moments \
        after an oil is rubbed on the body as the heated oil helps soften and expand the muscle tissues.",
        serviceProfilePic: "letsrelaxspa/Warm Oil Massage/oil-massage.jpg",
        time: 1,
        price: 1600,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 2,
      },
      {
        serviceName: "Back & Shoulder Massage",
        serviceDescription: "This massage technique utilizes finger pressure along with the hands and elbows on tension areas of back and shoulder. \
        Guests get to sits on a specially designed massage chair that gives full comfort after the massage. The treatment is good for jet lags, \
        eases strain and tension, mobilizes stiff joints, and improves blood circulation. A great treat after a long day of office work.",
        serviceProfilePic: "letsrelaxspa/Back & Shoulder Massage/masajes.jpg",
        time: 30,
        price: 350,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 2,
      },
      {
        serviceName: "Thai Massage",
        serviceDescription: "A must-try massage for foreign travelers. Thai Massage is influenced by Chinese and Indian healing arts, \
        which involves a combination of stretching and acupressure techniques. The massage is oil-free and performed on a mattress, \
        with loose pajamas are worn. Guests finish the treatment with Let’s Relax’s Cooling Oil that freshens the body for the rest of the day.",
        serviceProfilePic: "thaisquarespa/Thai Massage/thai_massage.jpg",
        time: 2,
        price: 1100,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 3,
      },
      {
        serviceName: "Body Scrub",
        serviceDescription: "This spa treatment exfoliates the dead skin cells using various combination of sea salt, essential oils, water, skin brush, or loofah. \
        Guest can choose from the selection of 6 types of scrub that best suited with their type of skin. \
        The treatment is found to nourish the skin, improve circulation, cleanse and tone even the most sensitive skin.",
        serviceProfilePic: "thaisquarespa/Body Scrub/Body-Scrub.jpg",
        time: 1,
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 3,
      },
      {
        serviceName: "Body Wrap",
        serviceDescription: "Treatment where the body is pasted with herb and wrapped in a plastic sheet and kept under the heated blankets for about 20 minutes, \
        allowing the skin to be pampered and moisturized. You can choose between cool aloe vera wrap, a perfect treatment after a long day under the sun, \
        or warm wrap for extra moisturization of the skin.",
        serviceProfilePic: "thaisquarespa/Body Wrap/Body-Wrap.jpg",
        time: 1,
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 3,
      },
      {
        serviceName: "Aromatherapy Oil Massage",
        serviceDescription: "An ancient therapeutic method of pressure point massage utilizing essential oils from plants, \
        leaves, and flowers that are applied to the body with a Swedish massage technique. A good treatment to reward yourself after a long day of work or travel, \
        the treatment if found to stimulate blood flow and lymph fluid.",
        serviceProfilePic: "thaisquarespa/Aromatherapy Oil Massage/aroma-therapy-massage.jpg",
        time: 1,
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 3,
      },
      {
        serviceName: "Thai Herbal Steam",
        serviceDescription: "Thai Herbal Steam Sauna is a treatment which uses steaming with herbs. It is believed to soften the skin, \
        helps cleanse body impurities and relax the muscles. The treatment is usually followed by a cold plunge or shower to restimulate the whole body.",
        serviceProfilePic: "thaisquarespa/Thai Herbal Steam/HerbalSteam.jpg",
        time: 30,
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
        shop_id: 3,
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('services', null, {});

  }
};
