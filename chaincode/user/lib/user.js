"use strict";

const { Contract } = require("fabric-contract-api");

class User extends Contract {
  async createNewUser(
    ctx,
    Id,
    FullName,
    Username,
    Password,
    Phone,
    Email,
    Address,
    AvatarUrl,
    OrgId,
    Role,
    Status
  ) {
    const user = {
      Id,
      FullName,
      Username,
      Password,
      Phone,
      Email,
      Address,
      AvatarUrl,
      OrgId,
      Role,
      Status,
      docType: "user",
    };

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(user)));
  }

  async getByIdUser(ctx, Id) {
    const userAsBytes = await ctx.stub.getState(Id);
    if (!userAsBytes || userAsBytes.length === 0) {
      return;
    }
    const user = JSON.parse(userAsBytes.toString());
    return JSON.stringify(user);
  }
  async getByUsername(ctx, Username) {
    let allResults = [];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.Username = Username;
    for await (const res of ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    )) {
      allResults.push(res.value.toString("utf8"));
    }
    return JSON.stringify(allResults);
  }
  async getAllUsers(ctx) {
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

  async changeUserById(
    ctx,
    Id,
    FullName,
    Username,
    Phone,
    Email,
    Address,
    AvatarUrl,
    OrgId
  ) {
    const userAsBytes = await ctx.stub.getState(Id);
    if (!userAsBytes || userAsBytes.length === 0) {
      return;
    }
    const user = JSON.parse(userAsBytes.toString());

    user.FullName = FullName;
    user.Username = Username;
    user.Phone = Phone;
    user.Email = Email;
    user.Address = Address;
    user.AvatarUrl = AvatarUrl;
    user.OrgId = OrgId;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(user)));
  }
  async changRoleUserById(ctx, Id, NewRole) {
    const userAsBytes = await ctx.stub.getState(Id);
    if (!userAsBytes || userAsBytes.length === 0) {
      return;
    }
    const user = JSON.parse(userAsBytes.toString());
    user.Role = NewRole;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(user)));
  }
  async changePasswordById(ctx, Id, NewPassword) {
    const userAsBytes = await ctx.stub.getState(Id);
    if (!userAsBytes || userAsBytes.length === 0) {
      return;
    }
    const user = JSON.parse(userAsBytes.toString());
    user.Password = NewPassword;

    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(user)));
  }
  async revokeUserById(ctx, Id, NewStatus) {
    const userAsBytes = await ctx.stub.getState(Id);
    if (!userAsBytes || userAsBytes.length === 0) {
      return;
    }
    const user = JSON.parse(userAsBytes.toString());
    user.Status = NewStatus;
    await ctx.stub.putState(Id, Buffer.from(JSON.stringify(user)));
  }
}

module.exports = User;
