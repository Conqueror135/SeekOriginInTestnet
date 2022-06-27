"use strict";
const BaseAdapter = require("../connectAdapter/BaseAdapter");
const PermissionAdapter = require("../connectAdapter/PermissionAdapter");

async function addNewPKI(Id, IdUser, PublicKey, EncodePrivateKey, MspId, Type,Version, Status) {
  try {

    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","pkichaincode");
    await contract.submitTransaction(
      "createNewPKI",
      Id,
      IdUser,
      PublicKey,
      EncodePrivateKey,
      Status
    );
    console.log("Add pki is success!");
    baseAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changeStatusPkiById(Id, NameIdentity, Identity, NewStatus) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract =  await permissionAdapter.getContract("seekorigin","pkichaincode");
    await contract.submitTransaction("revokePkiById", Id, NewStatus);
    console.log("Revoke pki is success!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getPkiById(Id) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","pkichaincode");
    const result = await contract.evaluateTransaction("getPkiById", Id);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return ;
  }
}
async function getAllPkis() {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","pkichaincode");
    const result = await contract.evaluateTransaction("getAllPkis");
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
    const contract = await baseAdapter.getContract("seekorigin","pkichaincode");
    const result = await contract.evaluateTransaction("getByUserId", UserId);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function getPkiByPublickey(PublicKey) {
  try {
    const baseAdapter = new BaseAdapter();
    await baseAdapter.initConnection();
    await baseAdapter.connetNetWork();
    const contract = await baseAdapter.getContract("seekorigin","pkichaincode");
    const result = await contract.evaluateTransaction("getPkiByPublickey", PublicKey);
    baseAdapter.DisconnectNetwork();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
async function changePKI(Id, IdUser, PublicKey, PrivateKeyEncode, Status) {
  try {
    const permissionAdapter = new PermissionAdapter(NameIdentity, Identity);
    await permissionAdapter.initConnection();
    await permissionAdapter.connetNetWork();
    const contract =  await permissionAdapter.getContract("seekorigin","pkichaincode");
    await contract.submitTransaction("changePKI", Id, IdUser, PublicKey, PrivateKeyEncode, Status);
    console.log("PKI pki is changed!");
    permissionAdapter.DisconnectNetwork();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}
module.exports = { addNewPKI, getPkiById, changeStatusPkiById, getAllPkis, changePKI, getPkiByPublickey, getByUserId };
