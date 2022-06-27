"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

////// INVOKE TRANSACTIONS  ///////////////////////
async function addNewOrg(
  Id,
  Name,
  Address,
  Email,
  Phone,
  Type,
  Status,
  NameIdentity,
  Identity
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "orgchaincode"
    );
    await contract.submitTransaction(
      "addNewOrg",
      Id,
      Name,
      Address,
      Email,
      Phone,
      Type,
      Status
    );
    console.log("Add new org pki is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeOrgById(
  Id,
  Name,
  Address,
  Email,
  Phone,
  Type,
  NameIdentity,
  Identity
) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "orgchaincode"
    );
    await contract.submitTransaction(
      "changeOrgById",
      Id,
      Name,
      Address,
      Email,
      Phone,
      Type
    );
    console.log("Add new org pki is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStatusOrgById(Id, Status) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract = await permissionAdapter.getContract(
      "seekorigin",
      "orgchaincode"
    );
    await contract.submitTransaction("changeStatusOrgById", Id, Status);
    console.log("Change status org pki is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
///// QUERY TRANSACTIONS      ////////////

async function getAllOrgs() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","orgchaincode");
    const result = await contract.evaluateTransaction("getAllOrgs");
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByOrgType(Type) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","orgchaincode");
    const result = await contract.evaluateTransaction("getAllOrgs", Type);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByOrgName(Name) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","orgchaincode");
    const result = await contract.evaluateTransaction("getByOrgName", Name);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getByOrgId(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","orgchaincode");
    const result = await contract.evaluateTransaction("getByOrgId", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
module.exports = {
  getByOrgId,
  getByOrgName,
  getByOrgType,
  getAllOrgs,
  changeStatusOrgById,
  changeOrgById,
  addNewOrg
}