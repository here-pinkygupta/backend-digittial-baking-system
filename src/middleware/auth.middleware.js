const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");


async function authMiddleware(req, res, next) {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, token missing",
    });
  }

  const isBlacklisted = await blacklistModel.findOne({ token: token });


  if(isBlacklisted){
    return res.status(401).json({
      message: "Token is blacklisted, please login again",
    });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }


 
}

async function authSystemUserMiddleware(req, res, next) {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];


    const isBlacklisted = await blacklistModel.findOne({ token: token });


  if(isBlacklisted){
    return res.status(401).json({
      message: "Token is blacklisted, please login again",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel
      .findById(decoded.userId)
      .select("+systemUser");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!user.systemUser) {
      return res.status(403).json({
        message: "Forbidden access, not a system user",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}






module.exports = {
  authMiddleware,
  authSystemUserMiddleware,
};