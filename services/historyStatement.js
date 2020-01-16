const passport = require('passport');
module.exports = (app, db) => {
     app.post('/historystatement',passport.authenticate('jwt', { session: false }),
       function(req,res){
           db.historyStatement.create({
               numberOfUser:req.body.numberofuser,
               price:req.body.price,
               startTime:req.body.starttime,
               endTime:req.body.endTime,
               date:req.body.date,
               status:"waitingApprove",
               paymentMethod:req.body.paymentmethod,
               attend:"No",
               paymentImage:'',
               serviceName:req.body.servicename,
               shopName:req.body.shopname,
               service_id:req.body.serviceid,
               shop_id:req.body.shopid,
               user_id:req.user.id
           })
       }
     )
}
