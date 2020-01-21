const fs = require("fs");
const passport = require("passport");
module.exports = (app, db) => {
  app.post(
    "/historystatement",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      if (!req.files) {
        res.send({
          status: false,
          message: "No file uploaded"
        });
      } else {
        if (!fs.existsSync(`image/${req.body.shopname}/payment`)) {
          fs.mkdirSync(
            `image/${req.body.shopname}/payment`,
            { recursive: true },
            err => {
              if (err) throw err;
            }
          );
        }
        const paymentphoto = req.files.paymentphoto;
        const paymentphotoname = `${new Date().getTime()}.jpeg`;
        paymentphoto.mv(
          `image/${req.body.shopname}/payment/${paymentphotoname}`
        );

        db.historyStatement
          .create({
            numberOfUser: req.body.numberofuser,
            price: req.body.price,
            startTime: req.body.starttime,
            endTime: req.body.endtime,
            date: req.body.date,
            status: "waitingApprove",
            paymentMethod: req.body.paymentmethod,
            attend: "No",
            paymentImage: `${req.body.shopname}/payment/${paymentphotoname}`,
            serviceName: req.body.servicename,
            shopName: req.body.shopname,
            service_id: req.body.serviceid,
            shop_id: req.body.shopid,
            user_id: req.user.id
          })
          .then(() => {
            res.status(200).json("payment complete");
          })
          .catch(err => {
            res.status(400).json({ message: err.message });
          });
      }
    }
  );

  app.get(
    "/getApproveList",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.roles === "seller") {
        db.historyStatement
          .findAll({
            attributes: [
              "id",
              "serviceName",
              "numberOfUser",
              "price",
              "paymentImage",
              "paymentMethod"
            ],
            where: { shop_id: req.user.id, status: "waitingApprove" },
            include: [
              {
                model: db.user
              }
            ]
          })
          .then(result => res.status(200).send(result))
          .catch(err => console.error(err));
      }
    }
  );

  app.put(
    "/rejectApprove/:statementId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let targetReject = await db.historyStatement.findOne({
          where: { id: req.params.statementId }
        });
        let RejectStatement = await targetReject.update({ status: "Reject" });
        res.status(200).send("Reject success");
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    }
  );

  app.put(
    "/approve/:statementId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {


      let targetApprove = await db.historyStatement.findOne({
        where: { id: req.params.statementId, paymentMethod: "payFullPrice" }
      });
      if (targetApprove) {
        let approveFullStatement = await targetApprove.update({
          status: "Approve"
        });

        res.status(200).send("Approve success");
      } else {
        let targetApproveNotFull = await db.historyStatement.findOne({
          where: { id: req.params.statementId, paymentMethod: "pay30" }
        });

        let approveNotFullStatement = await targetApproveNotFull.update({
          status: "Approve30"
        });

        res.status(200).send("Approve success");
      }
    }
  );

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
};
