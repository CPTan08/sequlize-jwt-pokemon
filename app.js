require("dotenv").config();
const express = require("express");
const db = require("./db/models/index");
const app = express();
const pokemonRouter = require("./router/pokemon.router.js");

app.use(express.json());

db.sequelize.sync();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// app.use("/pokemon", pokemonRouter);
// //default

const trainersRoutes = require("./router/trainers.router.js");
// app.use("/trainers", trainersRoutes);

const path = require("path");
const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/trainers", trainersRoutes);

// allows us to deploy both front/backend to 1 Heroku app
app.use(express.static(path.resolve("client", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "build", "index.html"))
);

module.exports = app;
