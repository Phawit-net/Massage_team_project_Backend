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
        .findOne({ where: {where: { id: req.user.id } } })
        .then(result => {
          res.status(201).json(result);
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
      db.shop.findOne({where: {id: req.user.id}}).then(async (result) => {
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
            const picture =  req.files.photoPost;
            const pictureName =  `${shopName}/${new Date().getTime()}.jpeg`;
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
};
