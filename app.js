const express = require("express");
const db = require("./db/models/index");
const app = express();
const pokemonRouter = require("./router/pokemon.router.js");
app.use(express.json());

db.sequelize.sync();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/pokemon", pokemonRouter);
//default

const trainersRoutes = require("./router/trainers.js");
app.use("/trainers", trainersRoutes);

module.exports = app;
