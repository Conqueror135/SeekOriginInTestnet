"use strict";

const { Contract } = require("fabric-contract-api");

class Step extends Contract {
  async createNewStep(
    ctx,
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
    const step = {
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
      Status,
      docType: "step",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(step)));
  }

  async getByStepId(ctx, StepId) {
    const stepAsBytes = await ctx.stub.getState(StepId);
    if (!stepAsBytes || stepAsBytes.length === 0) {
      return;
    }
    const step = JSON.parse(stepAsBytes.toString());
    return JSON.stringify(step);
  }
  async getStepByProcedureId(ctx, ProcedureId) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.ProcedureId = ProcedureId;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getStepByUserId(ctx, UserId) {
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
  async getAllSteps(ctx) {
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

  async changeStepById(
    ctx,
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
    const formStepAsBytes = await ctx.stub.getState(Id);
    if (!formStepAsBytes || formStepAsBytes.length === 0) {
      return;
    }
    const formStep = JSON.parse(formStepAsBytes.toString());
    formStep.Name = Name;
    formStep.Describe = Describe;
    formStep.IndexStep = IndexStep;
    formStep.ProcedureId = ProcedureId;
    formStep.UserId = UserId;
    formStep.SignBy = SignBy;
    formStep.SignAt = SignAt;
    formStep.TimeStart = TimeStart;
    formStep.TimeEnd = TimeEnd;
    formStep.CameraId = CameraId;
    formStep.MediaId = MediaId;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(formStep)));
  }
  async changeStatusStepById(ctx, Id, NewStatus) {
    const stepAsBytes = await ctx.stub.getState(Id);
    if (!stepAsBytes || stepAsBytes.length === 0) {
      return;
    }
    const step = JSON.parse(stepAsBytes.toString());
    step.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(step)));
  }
}

module.exports = Step;
