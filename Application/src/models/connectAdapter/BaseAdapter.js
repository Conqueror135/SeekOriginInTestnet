"use strict";

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

class BaseAdapter {
  constructor() {
    this.gateway = new Gateway();
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
      this.walletPath = path.join(process.cwd(), "src", "models", "wallet");
      this.wallet = await Wallets.newFileSystemWallet(this.walletPath);
      console.log(`Wallet path: ${walletPath}`);

      this.identity = await this.wallet.get("viewer");
      if (!this.identity) {
        console.log(
          'An identity for the user "viewer" does not exist in the wallet'
        );
        console.log("Run the enrollViewer.js application before retrying");
        return;
      }
    } catch (error) {}
  }
  async connetNetWork() {
    await this.gateway.connect(this.ccp, {
      wallet: this.wallet,
      identity: "viewer",
      discovery: { enabled: true, asLocalhost: true },
    });
  }
  async getContract(ChannelName, ChancodeName) {
    try {
      await this.gateway.connect(this.ccp, {
        wallet: this.wallet,
        identity: "viewer",
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
module.exports = BaseAdapter;
