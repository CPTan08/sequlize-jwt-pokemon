const express = require("express");
const db = require("./db/models/index");
const app = express();
const pokemonRouter = require("./router/pokemon.router.js");
app.use(express.json());

db.sequelize.sync();
app.use("/pokemon", pokemonRouter);

// // default error handler
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   res.status(err.statusCode).send(err.message);
// });

module.exports = app;
