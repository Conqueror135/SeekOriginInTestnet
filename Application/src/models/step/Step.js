"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function createNewStep(
    Id,
    Name,
    Describe,
    ProcedureId,
    UserId,
    SignBy,
    SignAt,
    TimeStart,
    TimeEnd,
    CameraId,
    MediaId,
    Status
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    await contract.submitTransaction(
      "createNewStep",
      Id,
      Name,
      Describe,
      ProcedureId,
      UserId,
      SignBy,
      SignAt,
      TimeStart,
      TimeEnd,
      CameraId,
      MediaId,
      Status
    );
    console.log("Add new step is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStepById(
    Id,
    Name,
    Describe,
    ProcedureId,
    UserId,
    SignBy,
    SignAt,
    TimeStart,
    TimeEnd,
    CameraId,
    MediaId
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    await contract.submitTransaction(
      "changeStepById",
      Id,
      Name,
      Describe,
      ProcedureId,
      UserId,
      SignBy,
      SignAt,
      TimeStart,
      TimeEnd,
      CameraId,
      MediaId
    );
    console.log("Change product is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStatusStepById(Id, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    await contract.submitTransaction("changeStatusStepById", Id, NewStatus);
    console.log("Change status step is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllSteps() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    const result = await contract.evaluateTransaction("getAllSteps");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getStepByProcedureId(ProcedureId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    const result = await contract.evaluateTransaction(
      "getStepByProcedureId",
      ProcedureId
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByStepId(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    const result = await contract.evaluateTransaction("getByStepId", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getStepByUserId(UserId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "stepchaincode"
    );
    const result = await contract.evaluateTransaction(
      "getStepByUserId",
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
    getStepByUserId,
    getByStepId,
    getStepByProcedureId,
    getAllSteps,
    changeStatusStepById,
    changeStepById,
    createNewStep
};
