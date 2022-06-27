"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function createNewProduct(
  Id,
  Name,
  Url,
  Describe,
  Parcel,
  Address,
  OrgId,
  ProcedureId,
  UserId,
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
      "productchaincode"
    );
    await contract.submitTransaction(
      "createNewProduct",
      Id,
      Name,
      Url,
      Describe,
      Parcel,
      Address,
      OrgId,
      ProcedureId,
      UserId,
      CameraId,
      MediaId,
      Status
    );
    console.log("Add new product is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeProductById(
  Id,
  Name,
  Url,
  Describe,
  Parcel,
  Address,
  OrgId,
  ProcedureId,
  UserId,
  CameraId,
  MediaId
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    await contract.submitTransaction(
      "changeProductById",
      Id,
      Name,
      Url,
      Describe,
      Parcel,
      Address,
      OrgId,
      ProcedureId,
      UserId,
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
async function changeStatusProductById(Id, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    await contract.submitTransaction("changeStatusProductById", Id, NewStatus);
    console.log("Change status product is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllProducts() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    const result = await contract.evaluateTransaction("getAllCameras");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getProductByParcel(Parcel) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    const result = await contract.evaluateTransaction(
      "getProductByParcel",
      Parcel
    );
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByIdProduct(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    const result = await contract.evaluateTransaction("getByIdProduct", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getProductByUserId(UserId) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract(
      "seekorigin",
      "productchaincode"
    );
    const result = await contract.evaluateTransaction(
      "getProductByUserId",
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
  getByIdProduct,
  getProductByUserId,
  getAllProducts,
  getProductByParcel,
  changeStatusProductById,
  createNewProduct,
  changeProductById
};
