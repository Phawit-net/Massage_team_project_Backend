module.exports = (app, db) => {

    app.get('/addBooking',
        (req, res) => {
            db.historyStatement.findOne({
                where: { id: req.query.id },
            })
                .then(result => {
                    res.send(result)
                })
        })

}