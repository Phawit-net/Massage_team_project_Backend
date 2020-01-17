const passport = require("passport");
module.exports = (app, db) => {
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
        let RejectStatement = await targetReject.update({status:'Reject'});
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
      try {
        let targetApprove = await db.historyStatement.findOne({
          where: { id: req.params.statementId,paymentMethod: 'payFullPrice'}
        });
        let approveFullStatement = await targetApprove.update({status:'Approve'});

        let targetApproveNotFull = await db.historyStatement.findOne({
            where: { id: req.params.statementId,paymentMethod: 'pay30%'}
          });
          let approveNotFullStatement = await targetApproveNotFull.update({status:'Approve30%'});


        res.status(200).send("Approve success");
      } catch (err) {

        res.status(400).send({ message: err.message });
      }
    }
  );
};
