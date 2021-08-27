const express = require("express");
const db = require("./db/models/index");
const app = express();
const pokemonRouter = require("./router/pokemon.router.js");
app.use(express.json());

db.sequelize.sync();
app.use("/pokemon", pokemonRouter);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

module.exports = app;
