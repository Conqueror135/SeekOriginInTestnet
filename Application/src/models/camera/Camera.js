"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function createNewCamera(
  Id,
  Name,
  Username,
  Password,
  Url,
  Type,
  UserId,
  ProductId,
  StepId,
  Status
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    await contract.submitTransaction(
      "createNewCamera",
      Id,
      Name,
      Username,
      Password,
      Url,
      Type,
      UserId,
      ProductId,
      StepId,
      Status
    );
    console.log("Add new camera is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeCameraById(
  Id,
  Name,
  Username,
  Password,
  Url,
  Type,
  UserId,
  ProductId,
  StepId
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    await contract.submitTransaction(
      "changeCameraById",
      Id,
      Name,
      Username,
      Password,
      Url,
      Type,
      UserId,
      ProductId,
      StepId
    );
    console.log("Change camera is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStatusCameraById(Id, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    await contract.submitTransaction("changeStatusCameraById", Id, NewStatus);
    console.log("Change status camera is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllCameras() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    const result = await contract.evaluateTransaction("getAllCameras");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByStepId(StepId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    const result = await contract.evaluateTransaction("getByStepId", StepId);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByProductId(ProductId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    const result = await contract.evaluateTransaction(
      "getByProductId",
      ProductId
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByUserId(UserId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    const result = await contract.evaluateTransaction("getByUserId", UserId);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByIdCamera(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "camerachaincode"
    );
    const result = await contract.evaluateTransaction("getByIdCamera", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
module.exports = {
  getByIdCamera,
  getByUserId,
  getByProductId,
  getByStepId,
  getAllCameras,
  changeStatusCameraById,
  changeCameraById,
  createNewCamera,
};
