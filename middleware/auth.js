const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).json({
        status: 1,
        message: "Access denied"
      });
    }

    const decoded = jwt.verify(
      token,
      config.get("jwtPrivateKey"),
      (err, decoded) => {
        if (!err) {
        //    console.log(`decoded - ${decoded.id}`);
          req.user = decoded;
          next();
          // return res.status(200).json({"status":0,"message":"valid token"});
        }else{
          return res
          .status(401)
          .json({ status: 1, message: "Invalid token Access Denied" });
        }
       
      }
    );
  } catch (error) {
    console.log(`EXCEPTION IN MIDDLEWARE AUTH - ${error.message}`);
  }
}

module.exports = auth;
