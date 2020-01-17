const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/passport/passport");
const fs = require("fs");

module.exports = (app, db) => {
  app.get("/shops", (req, res) => {
    db.shop
      .findAll()
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json();
      });
  });

  app.get(
    "/getShop",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      db.shop
        .findOne({ where: { id: req.user.id } })
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(400).json();
        });
    }
  );
  app.get(
    "/getShopUserUsage",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      db.historyStatement
        .findAll({
          attributes: [
            "shopName",
            [Sequelize.fn("count", Sequelize.col("shopName")), "count"]
          ],
          where:{user_id:req.user.id},
          group: ["shopName"],
          raw: true
        })
        .then(result => {
          console.log(result)
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).json();
        });
    }
  );

  app.put(
    "/updateShop",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      //// Create folder
      let shopName = "";
      db.shop
        .findOne({ where: { id: req.user.id } })
        .then(async result => {
          shopName = result.shopName;
          if (!fs.existsSync(`image/${result.shopName}`)) {
            fs.mkdirSync(
              `image/${result.shopName}/payment`,
              { recursive: true },
              err => {
                if (err) throw err;
              }
            );
          }

          if (!req.files) {
          } else {
            const picture = req.files.photoPost;
            const pictureName = `${shopName}/${new Date().getTime()}.jpeg`;
            await picture.mv(`./image/` + pictureName);
            db.shop
              .update(
                {
                  shopDescription: req.body.shopDescription,
                  shopAccountNo: req.body.shopAccountNo,
                  shopAccountName: req.body.shopAccountName,
                  shopProfilePic: `${pictureName}`
                },
                { where: { id: req.user.id } }
              )
              .then(result => {
                res.status(200).json(result);
              })
              .catch(error => {
                res.status(400).json({ message: error.message });
              });
          }
        })
        .catch(err => console.error(err));
    }
  );

  app.get("/searchshops", (req, res) => {
    db.shop
      .findAll({
        include: [
          {
            model: db.shopPic,
            attributes: ["picName"]
          }
        ],
        limit: 3,
        offset: (req.query.page - 1) * 3,
        where: {
          shopName: {
            [Op.substring]: `%${req.query.keyword}`
          }
        }
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json();
      });
  });

  app.get("/shops/:sid", (req, res) => {
    db.shop
      .findAll({
        include: [
          {
            model: db.shopPic,
            attributes: ["picName"]
          }
        ],
        limit: 3,
        offset: (req.params.sid - 1) * 3
      })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json();
      });
  });

  app.get("/shop", (req, res) => {
    db.shop
      .findOne({
        where: { id: req.query.id },
        include: [
          {
            model: db.service
          }
        ]
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
};
