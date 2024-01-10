const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        // console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.username = decoded.user;
        next();
      } else {
        res.status(200).json({ msg: "You are not authorized" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(400).json({ msg: "Please Login" });
  }
};

module.exports = { auth };
