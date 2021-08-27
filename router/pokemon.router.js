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

// route for search http://localhost:3000/pokemon/search?id=2&name=poke
router.get("/search", async (req, res, next) => {
  const pokemonId = req.query.id;
  const name = req.query.name;
  console.log(`this is pokemon ${pokemonId} - ${name}`);
  try {
    const pokemons = await db.Pokemon.findByPk(pokemonId);
    if (pokemons === null) {
      res.sendStatus(404); // return 404 if pokemon is null;
    } else {
      res.status(200).json(pokemons);
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

// route to update pokemons using the put
router.put("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemonToUpdate = await db.Pokemon.findByPk(pokemonId);

    if (pokemonToUpdate === null) return res.sendStatus(404);
    await pokemonToUpdate.update(req.body);

    res.json(pokemonToUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
