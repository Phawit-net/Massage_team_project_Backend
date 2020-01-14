const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = (app, db) => {

  app.get('/shops/:sid', (req, res) => {
    db.shop.findAll({
      include: [{
        model: db.shopPic,
        attributes: ["picName"]
      }],
      limit: 3,
      offset: (req.params.sid - 1) * 3
    })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        res.status(400).json()
      })
    })

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