const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const app = express();

const shopService = require("./services/shop");
const sericeService = require("./services/service");
// const userService = require('./services/user');
const userService = require("./services/user");
const historyStatement = require("./services/historyStatement")
const shopPicService = require("./services/shopPic");
const ContactUsService =require("./services/ContactUs")


app.use(fileUpload({ createParentPath: true }));

app.use(express.static("image"));

app.use(passport.initialize());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/passport/passport");

db.sequelize.sync({ alter: true  }).then(() => {
  shopService(app, db);
  sericeService(app, db);
  historyStatement(app,db)
  userService(app, db);
  shopPicService(app, db);
  ContactUsService(app)



  app.get('/protected', passport.authenticate('jwt', { session: false }),
    function (req, res) {
      res.send(req.user);
    }
  );

  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
});
