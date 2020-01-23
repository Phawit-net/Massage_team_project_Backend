const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/passport/passport');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const BCRYPT_SALT_ROUNDS = 12;
const mail = require('../config/mail/mail')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = (app, db) => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        db.user.findOne({
          where: {
            username: user.username,
          },
        }).then(user => {
          user.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            tel: req.body.tel,
            roles: req.body.roles
          })
            .then(() => {
              if (req.body.roles === 'seller') {
                db.shop.create({
                  shopName: req.body.shopName,
                  user_id: user.id
                })
                  .then(() => {
                    console.log('user created in db');
                    res.status(200).send({ message: 'user-seller created' });
                  })
                  .catch(err => {
                    console.error(err)
                    res.status(400).json({ message: err.message })
                  })
              } else {
                console.log('user created in db');
                res.status(200).send({ message: 'user-buyer created' });
              }
            });
        })
          .catch(err => {
            console.log(err)
          })

      }
    })(req, res, next);
  });

  app.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === 'username or password is invalid') {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        db.user.findOne({
          where: {
            username: req.body.username,
          },
        }).then(user => {
          const token = jwt.sign({
            id: user.id,
            role: user.roles,
            name: user.firstname,
          }, config.jwtOptions.secretOrKey, {
            expiresIn: 3600,
          });
          res.status(200).send({
            auth: true,
            token,
            message: 'user found & logged in',
          });
        });
      }
    })(req, res, next);
  });

  app.get(
    "/getUser",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

      db.user.findOne({ where: { id: req.user.id } })
        .then((result) => {
          res.status(201).json(result)
        })
        .catch((err) => {
          res.status(400).json()
        })
    })

  app.post('/forgetpassword', (req, res) => {
    db.user.findOne({
      where: {
        email: req.body.email
      }
    }).then(result => {
      if (result == null) {
        console.log('email not in database')
        res.status(203).send('email not found')
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        db.user.update(
          {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 900000
          },
          {
            where: {
              email: req.body.email
            }
          });
        let mailOption = mail.mailcreator('forgetpassword', req, token)
        mail.transporter.sendMail(mailOption, function (err, info) {
          if (err) {
            res.status(400).send({ message: err.message })
          } else {
            res.status(200).send('email has been sent, please check your email')
          }
        })
      }
    })
  })

  app.get('/checkresetpasswordtimeout', (req, res) => {
    db.user.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    }).then(result => {
      if (result == null) {
        res.status(200).send('timeout')
      } else {
        res.status(200).send({
          username: result.username,
          message: 'success'
        })
      }
    })
  })

  app.post('/resetpassword', (req, res) => {
    db.user.findOne({
      where: {
        username: req.body.username
      }
    }).then(async (result) => {
      if (result !== null) {
        console.log('user exist in db');
        let hashedpassword = await bcrypt.hash(req.body.newpassword, BCRYPT_SALT_ROUNDS)
        db.user.update({
          password: hashedpassword,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }, {
          where: { username: req.body.username }
        }
        )
          .then(() => {
            console.log('password is update');
            res.status(200).send({ message: 'we have change your password' })
          })
      } else {
        console.log('No user exist')
        res.status(404).send({ message: 'no user exist' })
      }
    })
  });

  app.get('/Alluser', (req, res) => {
    db.user.findAll().
      then(result => {
        res.status(201).json(result)
      }).catch(err => {
        res.status(400).json({ message: err.message })
      })
  });

  app.delete('/deleteUser/:id', (req, res) => {
    db.user.destroy({ where: { id: req.params.id } }).
      then(result => {
        res.status(201).json(result)
      }).catch(err => {
        res.status(400).json({ message: err.message })
      });
  })

}


