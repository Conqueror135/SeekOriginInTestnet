"use strict";

const { Contract } = require("fabric-contract-api");
const { url } = require("inspector");

class Media extends Contract {
  async createNewMedia(
    ctx,
    Id,
    Name,
    Url,
    Type,
    UserId,
    ProductId,
    StepId,
    Status
  ) {
    const media = {
      Id,
      Name,
      Url,
      Type,
      UserId,
      ProductId,
      StepId,
      Status,
      docType: "media",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(media)));
  }

  async getByIdMedia(ctx, Id) {
    const mediaAsBytes = await ctx.stub.getState(Id);
    if (!mediaAsBytes || mediaAsBytes.length === 0) {
      return;
    }
    const media = JSON.parse(userAsBytes.toString());
    return JSON.stringify(media);
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
  async getAllMedias(ctx) {
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

  async changeMediaById(ctx, Id, Name, Url, Type, UserId) {
    const mediaAsBytes = await ctx.stub.getState(Id);
    if (!mediaAsBytes || mediaAsBytes.length === 0) {
      return;
    }
    const media = JSON.parse(mediaAsBytes.toString());
    media.Name = Name;
    media.Url = Url;
    media.Type = Type;
    media.UserId = UserId;
    media.ProductId = ProductId;
    media.StepId = StepId;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(media)));
  }
  async changeStatusMediaById(ctx, Id, NewStatus) {
    const mediaAsBytes = await ctx.stub.getState(Id);
    if (!mediaAsBytes || mediaAsBytes.length === 0) {
      return;
    }
    const media = JSON.parse(mediaAsBytes.toString());
    media.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(media)));
  }
}

module.exports = Media;
