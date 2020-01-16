const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/passport/passport');


module.exports=(app,db)=>{
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
                        name: `${user.firstname}`,
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

}


