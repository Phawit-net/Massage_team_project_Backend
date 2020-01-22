const mail =require('../config/mail/mail')
module.exports=(app)=>{
    app.post('/contact',async(req,res)=>{
         let mailOptions = await mail.mailcreator('contactus',req)
          mail.transporter.sendMail(mailOptions,function(err,info){
          if(err){
              res.status(400).send({message:err.message})
          }
          else{
              res.status(200).send('email has been sent')
          }
      })
    })
}