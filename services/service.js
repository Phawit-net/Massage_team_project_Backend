module.exports = (app, db) => {

    app.get('/services', (req, res) => {
        db.service.findAll()
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(400).json()
            })
    })

    app.get('/servicesDetail',
        (req, res) => {
            db.service.findOne({
                where: { id: req.query.id },
                include: [{ model: db.shop }]
            })
                .then(result => {
                    res.send(result)
                })
        })

}