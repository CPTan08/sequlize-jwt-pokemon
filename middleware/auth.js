const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
      /* Alternatively, you can set a default error handler in app.js instead and do this:
        const err = new Error("You are not authorized");
        next(err);
      */
    } else {
      //`req.cookies` is populated by the `cookie-parser` middleware.
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = {
  auth,
};
