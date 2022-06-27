const CryptoJS = require("crypto-js");
async function createIdentity(
  publicKey,
  privateKeyEncode,
  mspId,
  type,
  version,
  password
) {
  try {
    const rawPrivateKey = CryptoJS.AES.decrypt(privateKeyEncode, password);
    const privateKey = rawPrivateKey.toString(CryptoJS.enc.Utf8);
    const Identity = {
      credentials: {
        certificate: publicKey,
        privateKey: privateKey,
      },
      mspId: mspId,
      type: type,
      version: version,
    };
    return Identity;
  } catch (error) {
    console.log(error);
    return;
  }
}
module.exports ={createIdentity};