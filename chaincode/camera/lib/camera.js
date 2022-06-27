"use strict";

const { Contract } = require("fabric-contract-api");
const { url } = require("inspector");

class Camera extends Contract {
  async createNewCamera(
    ctx,
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
    const camera = {
      Id,
      Name,
      Username,
      Password,
      Url,
      Type,
      UserId,
      ProductId,
      StepId,
      Status,
      docType: "camera",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(camera)));
  }

  async getByIdCamera(ctx, Id) {
    const cameraAsBytes = await ctx.stub.getState(Id);
    if (!cameraAsBytes || cameraAsBytes.length === 0) {
      return;
    }
    const camera = JSON.parse(cameraAsBytes.toString());
    return JSON.stringify(camera);
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
  async getByProductId(ctx, ProductId) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.ProductId = ProductId;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getByStepId(ctx, StepId) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.StepId = StepId;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getAllCameras(ctx) {
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

  async changeCameraById(
    ctx,
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
    const cameraAsBytes = await ctx.stub.getState(Id);
    if (!cameraAsBytes || cameraAsBytes.length === 0) {
      return;
    }
    const camera = JSON.parse(cameraAsBytes.toString());
    camera.Name = Name;
    camera.Username = Username;
    camera.Password = Password;
    camera.Url = Url;
    camera.Type = Type;
    camera.UserId = UserId;
    camera.ProductId = ProductId;
    camera.StepId = StepId;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(camera)));
  }
  async changeStatusCameraById(ctx, Id, NewStatus) {
    const cameraAsBytes = await ctx.stub.getState(Id);
    if (!cameraAsBytes || cameraAsBytes.length === 0) {
      return;
    }
    const camera = JSON.parse(cameraAsBytes.toString());
    camera.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(camera)));
  }
}

module.exports = Camera;
