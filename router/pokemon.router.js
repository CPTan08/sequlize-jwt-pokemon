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

// route to search
router.get("/search", async (req, res, next) => {
  try {
    const Id = req.query.id;
    const name = req.query.name;

    console.log(`this is pokemon id ${pokemonid} - ${name}`);
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(Id);
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

// route to DELETE /pokemons
router.delete("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemonToDelete = await db.Pokemon.findByPk(pokemonId);

    await db.Pokemon.destroy({
      where: {
        id: pokemonId,
      },
    });

    res.json(pokemonToDelete);
  } catch (error) {
    next(error);
  }
});

// route to UPDATE /pokemons using the post
router.post("/:id", async (req, res, next) => {
  try {
    const idtoUpdate = req.params.id;
    const reqBody = req.body;

    const [numofUpdatedRecord, updatedRecord] = await db.Pokemon.update(
      reqBody,
      {
        where: {
          id: idtoUpdate,
        },
        returning: true,
      }
    );
    res.json({ message: `Updated ${numofUpdatedRecord} successfully!` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
