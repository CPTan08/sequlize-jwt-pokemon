const express = require("express");
const db = require("../db/models/index");
const { Op } = require("sequelize");

const router = express.Router();

// Add POST /trainers route
router.post("/", async (req, res, next) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const trainers = await db.Trainer.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(trainers);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    // [db.Sequelize.Op.iLike] allows you to do case-insensitive + partial querying
    // e.g. "Sa" will return Samantha, Samuel..
    const trainer = await db.Trainer.findAll({
      where: { username: { [Op.iLike]: "%" + username + "%" } },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
