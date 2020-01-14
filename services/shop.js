const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = (app, db) => {

  app.get('/shops', (req, res) => {
    db.shop.findAll()
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        res.status(400).json()
      })
  })
  // req.params.keyword
  app.get('/searchShop', (req, res) => {
    db.shop.findAll({
      offset: (req.query.page - 1) * 3,
      limit: 3,
      where: {
        shopName: {
          [Op.substring]: `%${req.query.keyword}`
        }
      },
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(404).json()
      })
  })

}