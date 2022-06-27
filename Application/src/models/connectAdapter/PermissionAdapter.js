"use strict";

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

class PermissionAdapter {
  constructor(NameIdentity, Identity) {
    this.gateway = new Gateway();
    this.NameIdentity= NameIdentity;
    this.Identity = Identity;
  }
  async initConnection() {
    try {
      this.ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      this.ccp = JSON.parse(fs.readFileSync(this.ccpPath, "utf8"));

      this.wallet = await Wallets.newInMemoryWallet();
      this.wallet.put(this.NameIdentity, this.Identity);
    } catch (error) {
      console.log(error);
    }
  }
  async connetNetWork() {
    await this.gateway.connect(this.ccp, {
      wallet: this.wallet,
      identity: this.NameIdentity,
      discovery: { enabled: true, asLocalhost: true },
    });
  }
  async getContract(ChannelName, ChancodeName) {
    try {
      await this.gateway.connect(this.ccp, {
        wallet: this.wallet,
        identity: this.NameIdentity,
        discovery: { enabled: true, asLocalhost: true },
      });
      const network = await this.gateway.getNetwork(ChannelName);
      const contract = network.getContract(ChancodeName);
      return contract;
    } catch (error) {
      console.log(error);
    }
  }
  async DisconnectNetwork() {
    this.gateway.disconnect();
  }
}
module.exports = PermissionAdapter;
