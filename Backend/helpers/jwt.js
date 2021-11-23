const expressjwt = require("express-jwt");

function authJwt() {
  const secret = "secret";
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: "/tasks", methods: ["GET", "PUT", "OPTIONS"] },
      { url: "/projects", methods: ["GET", "PUT", "OPTIONS"] },
      "/users/login",
      "/users/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
