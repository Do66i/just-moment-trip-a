const { trip } = require("../../models");
const tokenHandler = require("../tokenHandler");
module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await trip.findAll();
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      res.status(501).send("Trip Get");
    }
  },

  post: async (req, res) => {
    try {
      const { title, country, total_price, base_currency, start_date, end_date } = req.body;
      if (!title || !country || !total_price || !base_currency || !start_date || !end_date) {
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }

      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const payload = {
          user_id: validity.id,
          title,
          country,
          total_price,
          base_currency,
          start_date,
          end_date,
        };

        const result = await trip.create(payload);
        res.status(201).send({ id: result.id, accessToken: validity.accessToken });
      }
    } catch (err) {
      res.status(501).send("Trip Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        res.status(200).send({ accessToken: validity.accessToken });
        await trip.destroy({
          where: { id: req.params.trip_id },
        });
      }
    } catch (err) {
      res.status(501).send("Trip Delete");
    }
  },
};
//트립 삭제