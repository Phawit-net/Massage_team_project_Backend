const fs = require("fs")
const passport = require('passport');
module.exports = (app, db) => {


  //PurchaseHistory--UserProfile
  app.get("/purchaseHistory",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      db.historyStatement.findAll({
        attributes: [
          "id",
          "shopName",
          "serviceName",
          "date",
          "startTime",
          "endTime",
          "numberOfUser",
          "price",
          "paymentMethod",
          "status"
        ],
        where: { user_id: req.user.id },
      })
        .then(result => res.status(200).send(result))
        .catch(err => console.error(err));
    }
  );

}