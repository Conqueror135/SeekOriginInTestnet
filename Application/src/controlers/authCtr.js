const md5 = require("md5");
const { getByUsername, save } = require("../models/userModel");
const {AddUser, getUserById} = require("../fabric/user/User");
const jwtHelper = require("../helpers/jwt.helper");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "Thang_Dep_Trai_Khong_Ai_Sanh_Bang_:))";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "Thang_Dep_Trai_Khong_Ai_Sanh_Bang_:))";

let login = async (req, res) => {
  try {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const encodePassword = md5(password);
    const user = await getByUsername(username);
    if (user) {
      if (user.password === encodePassword) {
        const accessToken = await jwtHelper.generateToken(
          user,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await jwtHelper.generateToken(
          user,
          refreshTokenSecret,
          refreshTokenLife
        );
        tokenList[refreshToken] = { accessToken, refreshToken };
        return res.status(200).json({ accessToken, refreshToken });
      } else {
        return res.status(401).json({
          message: "Password is incorrect.",
        });
      }
    } else {
      return res.status(401).json({
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const register = async (req, res) => {
  const role = 0;
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const phone = body.phone;
  const email = body.email;
  const address = body.address;
  const orgId = body.orgId;
  const status = 1;
  const avatarUrl ="";
  const id = await md5(username+password);
 // const user = await getUserById(username);
 // console.log(user);
  if (true) {
    const encodePassword = await md5(password);
    console.log(encodePassword);
    await AddUser(id, username, password, phone, email, address, avatarUrl, orgId, role, status);
    return res.status(201).json({
      message: "Sig up success!",
    });
  } else {
    return res.status(401).json({
      message: "The username already exists!",
    });
  }
};

let refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );
      const userData = decoded.data;
      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );
      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(403).json({
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

module.exports = {
  login: login,
  register: register,
  refreshToken: refreshToken,
};
