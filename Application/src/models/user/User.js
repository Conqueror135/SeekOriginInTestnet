"use strict";

const BaseAdapter = require("../connectAdapter/BaseAdapter");

async function AddUser(
  Id,
  FullName,
  Username,
  Password,
  Phone,
  Email,
  Address,
  AvatarUrl,
  OrgId,
  Role,
  Status
) {
  const baseAdapter = new BaseAdapter();
  await baseAdapter.initConnection();
  await baseAdapter.connetNetWork();
  const contract = await baseAdapter.getContract("seekorigin", "userchaincode");
  await contract.submitTransaction(
    "createNewUser",
    Id,
    FullName,
    Username,
    Password,
    Phone,
    Email,
    Address,
    AvatarUrl,
    OrgId,
    Role,
    Status
  );
  baseAdapter.DisconnectNetwork();
}
async function revokeUserById(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    await contract.submitTransaction("revokeUserById", Id);
    baseAdapter.DisconnectNetwork();
    console.log("Revoke is success!");
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getUserById(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "userchaincode"
    );
    const result = await contract.evaluateTransaction("getByIdUser", Id);
    baseAdapter.DisconnectNetwork();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getAllUsers() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "userchaincode"
    );
    const result = await contract.evaluateTransaction("getAllUsers");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByUsername(Username) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "userchaincode"
    );
    const result = await contract.evaluateTransaction(
      "getByUsername",
      Username
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changePasswordUserById(Id, NewPassword){
    try {
        const baseAdapter = new BaseAdapter();
        await baseAdapter.initConnection();
        await baseAdapter.connetNetWork();
        const contract = await baseAdapter.getContract(
            "seekorigin",
            "userchaincode"
          );
        await contract.submitTransaction("changePasswordById", Id, NewPassword);
        baseAdapter.DisconnectNetwork();
        console.log("Password is changed!");
      } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
      }
}
async function changeUserById(Id){
    try {
        const baseAdapter = new BaseAdapter();
        await baseAdapter.initConnection();
        await baseAdapter.connetNetWork();
        const contract = await baseAdapter.getContract(
            "seekorigin",
            "userchaincode"
          );
        await contract.submitTransaction("changeUserById", Id);
        baseAdapter.DisconnectNetwork();
        console.log("User is changed!");
      } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
      }
}
module.exports = {
  AddUser,
  getUserById,
  getAllUsers,
  getByUsername,
  revokeUserById,
  changePasswordUserById,
  changeUserById
};
