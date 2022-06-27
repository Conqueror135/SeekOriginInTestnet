"use strict";

const { Contract } = require("fabric-contract-api");

class PKI extends Contract {
  async createNewPKI(
    ctx,
    Id,
    UserId,
    PublicKey,
    PrivateKeyEncode,
    Type,
    Version,
    Status
  ) {
    const pki = {
      Id,
      UserId,
      PublicKey,
      PrivateKeyEncode,
      Type,
      Version,
      Status,
      docType: "pki",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(pki)));
  }

  async getPkiById(ctx, Id) {
    const pkiAsBytes = await ctx.stub.getState(Id);
    if (!pkiAsBytes || pkiAsBytes.length === 0) {
      return;
    }
    const pki = JSON.parse(pkiAsBytes.toString());
    return JSON.stringify(pki);
  }
  async getByUserId(ctx, UserId) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.UserId = UserId;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getPkiByPublickey(ctx, PublicKey) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.PublicKey = PublicKey;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getAllPkis(ctx) {
    const startKey = "";
    const endKey = "";
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByRange(
      startKey,
      endKey
    )) {
      const strValue = Buffer.from(value).toString("utf8");
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    return JSON.stringify(allResults);
  }

  async changePKI(ctx, Id, IdUser, PublicKey, PrivateKeyEncode, Status) {
    const pkiAsBytes = await ctx.stub.getState(Id);
    if (!pkiAsBytes || pkiAsBytes.length === 0) {
      return;
    }
    const pki = JSON.parse(pkiAsBytes.toString());
    pki.IdUser = IdUser;
    pki.PublicKey = PublicKey;
    pki.PrivateKeyEncode = PrivateKeyEncode;
    pki.Status = Status;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(pki)));
  }
  async revokePkiById(ctx, Id, NewStatus) {
    const pkiAsBytes = await ctx.stub.getState(Id);
    if (!pkiAsBytes || pkiAsBytes.length === 0) {
      return;
    }
    const pki = JSON.parse(pkiAsBytes.toString());
    pki.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(pki)));
  }
}

module.exports = PKI;
