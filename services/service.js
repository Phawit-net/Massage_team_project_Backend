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
                .then(async result => {
                  dataImages.push(result);
                  // Create folder path
                  await fs.mkdir(
                    `image/${shopname}/${req.body.serviceName}`,
                    { recursive: true },
                    err => {
                      if (err) throw err;
                    }
                  );

                  let countImage = 1;
                  let pictures = req.files.serviceProfilePic;
                  if (!pictures.length) {
                    pictures = [req.files.serviceProfilePic];
                  }

                  pictures.forEach(picture => {
                    const pictureName = `${new Date().getTime()}${countImage}.jpeg`;
                    picture.mv(
                      `./image/${shopname}/${req.body.serviceName}/` +
                      pictureName
                    );
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
};
