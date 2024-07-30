const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.end("Please Login First");

    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
  restrictTo,
};
