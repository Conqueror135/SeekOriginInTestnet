"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function createNewProcedure(
  Id,
  Name,
  Describe,
  UserId,
  Status,
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    await contract.submitTransaction(
      "createNewProcedure",
      Id,
      Name,
      Describe,
      UserId,
      Status,
    );
    console.log("Add new procedure is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeProcedureById(
    Id, NewName, NewDescribe, NewUserId
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    await contract.submitTransaction(
      "changeProcedureById",
      Id, NewName, NewDescribe, NewUserId
    );
    console.log("Change procedure is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStatusProcedureById(Id, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    await contract.submitTransaction("changeStatusProcedureById", Id, NewStatus);
    console.log("Change status procedure is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllProcedures() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    const result = await contract.evaluateTransaction("getAllProcedures");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByIdProcedure(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    const result = await contract.evaluateTransaction("getByIdProcedure", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getProcedureByUserId(UserId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "proceduechaincode"
    );
    const result = await contract.evaluateTransaction(
      "getProcedureByUserId",
      UserId
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
module.exports = {
    getProcedureByUserId,
    getByIdProcedure,
    getAllProcedures,
    changeStatusProcedureById,
    changeProcedureById,
    createNewProcedure
};
