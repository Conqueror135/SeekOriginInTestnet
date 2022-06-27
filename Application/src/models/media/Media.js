"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function createNewMedia(
  Id,
  Name,
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
      "mediachaincode"
    );
    await contract.submitTransaction(
      "createNewMedia",
      Id,
      Name,
      Url,
      Type,
      UserId,
      ProductId,
      StepId,
      Status
    );
    console.log("Add new media is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function changeMediaById(Id, Name, Url, Type, UserId) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    await contract.submitTransaction(
      "changeMediaById",
      Id,
      Name,
      Url,
      Type,
      UserId
    );
    console.log("Change media is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function changeStatusMediaById(Id, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    await contract.submitTransaction("changeStatusMediaById", Id, NewStatus);
    console.log("Change status media is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllMedias() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    const result = await contract.evaluateTransaction("getAllMedias");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function getByStepId(StepId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    const result = await contract.evaluateTransaction("getByStepId", StepId);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function getByProductId(ProductId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    const result = await contract.evaluateTransaction(
      "getByProductId",
      ProductId
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function getByUserId(UserId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    const result = await contract.evaluateTransaction("getByUserId", UserId);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
async function getByIdMedia(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "mediachaincode"
    );
    const result = await contract.evaluateTransaction("getByIdMedia", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return;
  }
}
module.exports = {
  getByIdMedia,
  getByUserId,
  getByProductId,
  getByStepId,
  getAllMedias,
  changeStatusMediaById,
  changeMediaById,
  createNewMedia,
};
