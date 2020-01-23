module.exports = (app, db) => {

  app.get("/address", (req, res) => {
    db.address
      .findOne({
        where: { shop_id: req.query.id },
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

};
