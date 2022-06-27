"use strict";

const { Contract } = require("fabric-contract-api");

class Procedure extends Contract {
  async createNewProcedure(ctx, Id, Name, Describe, UserId, Status) {
    const Procedure = {
      Id,
      Name,
      Describe,
      UserId,
      Status,
      docType: "procedure",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(Procedure)));
  }

  async getByIdProcedure(ctx, Id) {
    const procedureAsBytes = await ctx.stub.getState(Id);
    if (!procedureAsBytes || procedureAsBytes.length === 0) {
      return;
    }
    const procedure = JSON.parse(procedureAsBytes.toString());
    return JSON.stringify(procedure);
  }
  async getProcedureByUserId(ctx, UserId) {
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
  async getAllProcedures(ctx) {
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

  async changeProcedureById(ctx, Id, NewName, NewDescribe, NewUserId) {
    const procedureAsBytes = await ctx.stub.getState(Id);
    if (!procedureAsBytes || procedureAsBytes.length === 0) {
      return;
    }
    const procedure = JSON.parse(procedureAsBytes.toString());
    procedure.Name = NewName;
    procedure.Describe = NewDescribe;
    procedure.UserId = NewUserId;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(procedure)));
  }
  async changeStatusProcedureById(ctx, Id) {
    const procedureAsBytes = await ctx.stub.getState(Id);
    if (!procedureAsBytes || procedureAsBytes.length === 0) {
      return;
    }
    const procedure = JSON.parse(procedureAsBytes.toString());
    procedure.Status = 0;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(procedure)));
  }
}

module.exports = Procedure;
