// Get modules node
const fs = require("fs");
const passport = require("passport");
module.exports = (app, db) => {
  app.get("/services", (req, res) => {
    db.service
      .findAll()
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json();
      });
  });

  app.post(
    "/createService",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.roles === "seller") {
        let price = req.body.price;
        price = parseFloat(price);
        let time = req.body.time;
        time = parseInt(time);

        let shopname = "";
        let dataImages = [];
        let shopData = await db.shop
          .findOne({ where: { user_id: req.user.id } })
          .then(async result => {
            shopname = result.shopName;

            if (!req.files) {
              console.log("NO file");
              res.send({
                status: false,
                message: "No file uploaded"
              });
            } else {
              await db.service
                .create({
                  serviceName: req.body.serviceName,
                  serviceDescription: req.body.serviceDescription,
                  shop_id: req.user.id,
                  time: time,
                  price: price
                })
                .then(result => {
                  dataImages.push(result);
                  // Create folder path
                  if (
                    !fs.existsSync(`image/${shopname}/${req.body.serviceName}`)
                  ) {
                    fs.mkdirSync(
                      `image/${shopname}/${req.body.serviceName}`,
                      { recursive: true },
                      err => {
                        if (err) throw err;
                      }
                    );
                  }
                  let countImage = 1;
                  let pictures = req.files.serviceProfilePic;
                  if (!pictures.length) {
                    pictures = [req.files.serviceProfilePic];
                  }

                  pictures.forEach(picture => {
                    const pictureName = `${shopname}/${
                      req.body.serviceName
                    }/${new Date().getTime()}${countImage}.jpeg`;
                    picture.mv(`./image/` + pictureName);
                    if (countImage == 1) {
                      db.service
                        .update(
                          { serviceProfilePic: pictureName },
                          { where: { id: result.id } }
                        )
                        .catch(err => console.error(err.message));
                    }
                    // console.log(result.id)
                    countImage++;
                    let pictureSize = picture.size;
                    let dataImage = { name: pictureName, pictureSize };
                    dataImages.push(dataImage);

                    db.servicePic
                      .create({ picName: pictureName, service_id: result.id })
                      .catch(err => console.error(err.message));
                  });
                  res.send({
                    status: true,
                    message: "File is uploaded",
                    data: dataImages
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(401).send({ message: err.message });
                });
            }
          })
          .catch(err => res.status(401).send({ message: err.message }));
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.get(
    "/getServices",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.roles === "seller") {
        db.service
          .findAll({
            where: { shop_id: req.user.id }
          })
          .then(result => res.status(200).send(result))
          .catch(err => console.error(err));
      }
    }
  );
  app.delete(
    "/deleteService/:serviceId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let targetDelete = await db.service.findOne({
          where: { id: req.params.serviceId }
        });
        let deleteService = await targetDelete.destroy({});
        res.status(200).send("delete success");
      } catch (err) {
        console.log('-----------------')
        res.status(400).send({ message: err.message });
      }
    }
  );

  app.get("/servicesDetail", (req, res) => {
    db.service
      .findOne({
        where: { id: req.query.id },
        include: [{ model: db.shop }]
      })
      .then(result => {
        res.send(result);
      });
  });

  app.get(
    "/servicePic",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      db.service
        .findOne({ where: { id: req.user.id } })
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(400).json();
        });
    }
  );


};


