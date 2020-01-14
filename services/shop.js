module.exports = (app, db) => {

    app.get('/shops/:sid', (req, res) => {
        db.shop.findAll({
            include: [{
                model: db.shopPic,
                attributes: ["picName"]
              }],
            limit:3,
            offset: (req.params.sid -1)*3
        })
            .then((result) => {
                res.status(201).json(result)
        })
            .catch((err) => {
                res.status(400).json()
            })
    })

}