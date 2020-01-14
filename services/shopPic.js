module.exports = (app, db) => {

  app.get("/shopPicture/:shopId", (req, res) => {
    db.format
      .findAll({
        where: {
          product_id: req.params.shopId
        },
        attributes: ["picName"]
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).json({ message: error.message });
      });
  });
};
