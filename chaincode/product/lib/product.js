"use strict";

const { Contract } = require("fabric-contract-api");

class Product extends Contract {
  async createNewProduct(
    ctx,
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
    const product = {
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
      Status,
      docType: "product",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(product)));
  }

  async getByIdProduct(ctx, Id) {
    const productAsBytes = await ctx.stub.getState(Id);
    if (!productAsBytes || productAsBytes.length === 0) {
      return;
    }
    const product = JSON.parse(productAsBytes.toString());
    return JSON.stringify(product);
  }
  async getProductByUserId(ctx, UserId) {
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
  async getProductByParcel(ctx, Parcel) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.Parcel = Parcel;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getAllProducts(ctx) {
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

  async changeProductById(
    ctx,
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
    const productAsBytes = await ctx.stub.getState(Id);
    if (!productAsBytes || productAsBytes.length === 0) {
      return;
    }
    const product = JSON.parse(productAsBytes.toString());
    product.Name = Name;
    product.Url = Url;
    product.Describe = Describe;
    product.Parcel = Parcel;
    product.Address = Address;
    product.OrgId = OrgId;
    product.ProcedureId = ProcedureId;
    product.UserId = UserId;
    product.CameraId = CameraId;
    product.MediaId = MediaId;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(product)));
  }
  async changeStatusProductById(ctx, Id, NewStatus) {
    const productAsBytes = await ctx.stub.getState(Id);
    if (!productAsBytes || productAsBytes.length === 0) {
      return;
    }
    const product = JSON.parse(productAsBytes.toString());
    product.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(product)));
  }
}

module.exports = Product;
