const fs = require("fs")
const passport = require('passport');
module.exports = (app, db) => {
  app.post('/historystatement', passport.authenticate('jwt', { session: false }),
    function (req, res) {
      if (!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded'
        })
      } else {

        if (!fs.existsSync(`image/${req.body.shopname}/payment`)) {
          fs.mkdirSync(`image/${req.body.shopname}/payment`,
            { recursive: true },
            err => { if (err) throw err })
        }
        const paymentphoto = req.files.paymentphoto
        const paymentphotoname = `${(new Date()).getTime()}.jpeg`;
        paymentphoto.mv(`image/${req.body.shopname}/payment/${paymentphotoname}`)

        db.historyStatement.create({
          numberOfUser: req.body.numberofuser,
          price: req.body.price,
          startTime: req.body.starttime,
          endTime: req.body.endtime,
          date: req.body.date,
          status: "waitingApprove",
          paymentMethod: req.body.paymentmethod,
          attend: "No",
          paymentImage: `http://localhost:8080/${req.body.shopname}/payment/${paymentphotoname}`,
          serviceName: req.body.servicename,
          shopName: req.body.shopname,
          service_id: req.body.serviceid,
          shop_id: req.body.shopid,
          user_id: req.user.id
        })
          .then(() => {
            res.status(200).json('payment complete')
          })
          .catch(err => {
            res.status(400).json({ message: err.message })
          })
      }
    }
  )
}
