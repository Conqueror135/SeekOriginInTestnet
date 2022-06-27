const {
  AddUser,
  getUserById,
  getAllUsers,
  getByUsername,
  revokeUserById,
  changePasswordUserById,
  changeUserById,
} = require("../models/user/User");

const modifyPermissions = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const newRole = body.newRole;
  if (username && newRole) {
    const user = await getByUsername(username);
    await updateUser(user._id, user.username, user.password, newRole);
    return res.status(200).json({ username: username, role: newRole });
  } else {
    return res.status(403).send({
      message: "Username is not Found!",
    });
  }
};
const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json({ users });
};
const revokeUser = async (req, res) => {
  const { _id } = req.params;
  if (_id) {
    await revokeUserById(_id);
    return res.status(201).send({
      message: `User id ${_id} is revoked!`,
    });
  } else {
    return res.status(403).send({
      message: "Id is not Found!",
    });
  }
};
module.exports = {
  modifyPermissions: modifyPermissions,
  getUsers: getUsers,
  revokeUser: revokeUser,
};
