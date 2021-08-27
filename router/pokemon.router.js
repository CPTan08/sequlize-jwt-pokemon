const db = require("../db/models/index");
const express = require("express");
const router = express.Router();

// route to GET / all pokemons
router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

// route to GET / by id pokemons
router.get("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(pokemonId);
    if (pokemon === null) {
      res.sendStatus(404);
    } else {
      res.json(pokemon);
    }
  } catch (error) {
    next(error);
  }
});

// route to POST /pokemons
router.post("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.create(req.body);

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
