// config/database.js

module.exports = {
  development: {
    // replace the `username` and `password` with the credentials for your postgres server
    username: "postgres",
    password: null,
    database: "sequelize_jwt_pokemon_dev",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    // replace the `username` and `password` with the credentials for your postgres server
    username: "postgres",
    password: null,
    database: "sequelize_jwt_pokemon_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
