const md5 = require("md5");
const { AddUser, getUserById } = require("../models/user/User");
const { addNewPKI, getPkiById } = require("../models/pki/Pki");
const { createIdentity } = require("../models/registerUser");
const CryptoJS = require("crypto-js");

const jwtHelper = require("../helpers/jwt.helper");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "Thang_Dep_Trai_Khong_Ai_Sanh_Bang_:))";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "Thang_Dep_Trai_Khong_Ai_Sanh_Bang_:))";

let login = async (req, res) => {
  console.log(req.body);
  try {
    const body = req.body;
    const Username = body.Username;
    const Password = body.Password;
    const encodePassword = md5(Password);
    const Id = await md5(Username + Password);

    const rawUser = await getUserById(Id);
    const user = JSON.parse(rawUser);
    if (user) {
      if (user.Password === encodePassword) {
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
  const body = req.body;
  const FullName = body.FullName;
  const Username = body.Username;
  const Password = body.Password;
  const AvatarUrl = "";
  const Phone = body.Phone;
  const Email = body.Email;
  const Address = body.Address;
  const OrgId = "Org1MSP";
  const Role = 0;
  const Status = 1;
  try {
    const Id = await md5(Username + Password);
    const user = await getUserById(Id);
    console.log(user.toString());
    if (!user.toString()) {
      const encodePassword = await md5(Password);
      console.log(encodePassword);
      await AddUser(
        Id,
        FullName,
        Username,
        encodePassword,
        Phone,
        Email,
        Address,
        AvatarUrl,
        OrgId,
        Role,
        Status
      );
      const identity = await createIdentity(Id, "producer");
      const identityUser = JSON.parse(identity);
      const publicKey = identityUser.credentials.certificate.toString();
      const privateKey = identityUser.credentials.privateKey.toString();
      const PrivateKeyEncode = CryptoJS.AES.encrypt(
        privateKey,
        Password
      ).toString();
      const IdPki = await md5(Username + Password + "pki");
      await addNewPKI(IdPki, Id, publicKey, PrivateKeyEncode, 0);

      return res.status(201).json({
        message: "Sig up success!",
        credentials: {
          publicKey: publicKey,
          privateKey: privateKey,
          encodePrivateKey: PrivateKeyEncode,
          status: 0,
        },
        mspId: "Org1MSP",
        type: "X.509",
      });
    } else {
      return res.status(401).json({
        message: "The username already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Sig up failed!",
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
