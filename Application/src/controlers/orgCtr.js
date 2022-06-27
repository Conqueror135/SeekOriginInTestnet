const {
  getByOrgId,
  getByOrgName,
  getByOrgType,
  getAllOrgs,
  changeStatusOrgById,
  changeOrgById,
  addNewOrg,
} = require("../models/org/Org");
const md5 = require("md5");
const {
  addNewPKI,
  getPkiById,
  changeStatusPkiById,
  getAllPkis,
  changePKI,
  getPkiByPublickey,
  getByUserId,
} = require("../models/pki/Pki");
const { createIdentity } = require("./buildWallet/buildWallet");

const createNewOrg = async (req, res) => {
  try {
    const body = req.body;
    const data = body.data;
    const user = body.user;
    const Name = data.Name;
    const Address = data.Address;
    const Email = data.Email;
    const Phone = data.Phone;
    const Type = data.Type;
    const Status = data.Status;

    const IdOrg = md5(Name);
    const Username = user.Username;
    const Password = user.Password;

    const IdUserRemover = await md5(Username + Password);
    const IdPkiRemover = await md5(Username + Password + "pki");
    const mspId = "Org1MSP";
    const type = "X.509";
    const version = 1;
    const pkiRemover = await getPkiById(IdPkiRemover);
    if (pkiRemover) {
      const Identity = await createIdentity(
        pkiRemover.PublicKey,
        pkiRemover.PrivateKeyEncode,
        mspId,
        type,
        version,
        Password
      );
      if (IdOrg) {
        await addNewOrg(
          IdOrg,
          Name,
          Address,
          Email,
          Phone,
          Type,
          Status,
          IdUserRemover,
          Identity
        );
        return res.status(201).send({
          message: `The Org is created!`,
        });
      } else {
        return res.status(403).send({
          message: "Id is not Found!",
        });
      }
    }
  } catch (error) {}
};
module.exports={
    createNewOrg:createNewOrg
}