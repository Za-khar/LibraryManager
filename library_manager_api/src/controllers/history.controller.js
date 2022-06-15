const historyModel = require("../models/History");

class HistoryController {
  async getHistory(req, res) {
    try {
      const limit = req?.query?.limit || 10;
      const offset = !!req?.query?.page ? (req.query.page - 1) * limit : 0;
      const history = await historyModel.getHistory(limit, offset);
      const total = await historyModel.getHistoryCount();
      res.send({ data: history, total: total.count });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Get history error!" });
    }
  }
}

module.exports = new HistoryController();
