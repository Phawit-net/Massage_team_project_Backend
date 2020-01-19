const nodemailer=require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nuadthaijob@gmail.com', 
      pass: 'codecamp4nuadthai',
    }
  });
module.exports=(app)=>{
    app.post('/contact',(req,res)=>{
         let mailOptions = {
        from: `${req.body.sender}`,                
        to: `${req.body.receiver}`,               
        subject: `${req.body.title}`,           
        html: `<h2>${req.body.sender}</h2>
               <h3>${req.body.message}</h3>` 
      };
      transporter.sendMail(mailOptions,function(err,info){
          if(err){
              res.status(400).send({message:err.message})
          }
          else{
              res.status(200).send('email has been sent')
          }
      })
    })
}