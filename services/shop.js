module.exports = (app, db) => {

    app.get('/shops', (req, res) => {
        db.shop.findAll({
            include: [{
                model: db.shopPic,
                attributes: ["picName"]
              }]            
        })
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(400).json()
            })
    })

}