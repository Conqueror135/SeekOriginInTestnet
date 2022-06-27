"use strict";

const { Contract } = require("fabric-contract-api");

class Org extends Contract {
  async addNewOrg(ctx, Id, Name, Address, Email, Phone, Type, Status) {
    const org = {
      Id,
      Name,
      Address,
      Email,
      Phone,
      Type,
      Status,
      docType: "org",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(org)));
  }

  async getByOrgId(ctx, Id) {
    const orgAsBytes = await ctx.stub.getState(Id);
    if (!orgAsBytes || orgAsBytes.length === 0) {
      return;
    }
    const org = JSON.parse(orgAsBytes.toString());
    return JSON.stringify(org);
  }
  async getByOrgName(ctx, Name) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.Name = Name;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getByOrgType(ctx, Type) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.Type = Type;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getAllOrgs(ctx) {
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

  async changeOrgById(ctx, Id, Name, Address, Email, Phone, Type) {
    const orgAsBytes = await ctx.stub.getState(Id);
    if (!orgAsBytes || orgAsBytes.length === 0) {
      return;
    }
    const org = JSON.parse(orgAsBytes.toString());
    org.Name = Name;
    org.Address = Address;
    org.Email = Email;
    org.Phone = Phone;
    org.Type = Type;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(org)));
  }
  async changeStatusOrgById(ctx, Id, Status) {
    const orgAsBytes = await ctx.stub.getState(Id);
    if (!orgAsBytes || orgAsBytes.length === 0) {
      return;
    }
    const org = JSON.parse(orgAsBytes.toString());
    org.Status = Status;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(org)));
  }
}

module.exports = Org;
