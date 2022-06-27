//const Forge = require("node-forge");
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
// let createPKI = async (req, res) => {
//   if (req.jwtDecoded) {
//     const idUser = req.jwtDecoded.data._id;
//     const ListPkiByIdUser = await getByUserId(idUser);
//     const CurrentSizeListPki = ListPkiByIdUser.length;

//     let count = 0;
//     let ver = 0;
//     if (CurrentSizeListPki > 0) {
//       for (const pki of ListPkiByIdOwner) {
//         if (pki.status == 0) {
//           count++;
//         }
//       }
//     }
//     if (count == CurrentSizeListPki) {
//       ver = CurrentSizeListPki;
//     }
//     if (CurrentSizeListPki == 0 || count == CurrentSizeListPki) {
//       const keys = await new Promise((resolve, reject) =>
//         Forge.pki.rsa.generateKeyPair(1024, (error, keys) => {
//           if (error) reject(error);
//           resolve(keys);
//         })
//       );

//       const publicKey = Forge.pki.publicKeyToPem(keys.publicKey);
//       const privateKey = Forge.pki.privateKeyToPem(keys.privateKey);
//       const status = 1;

//       await addNewPKI({ idOwner, publicKey, status, ver });
//       return res.status(200).json({
//         keys: {
//           publicKey: publicKey,
//           privateKey: privateKey,
//           ver: ver,
//         },
//       });
//     } else {
//       return res.status(403).send({
//         message: "Unqualified!",
//       });
//     }
//   } else {
//     return res.status(403).send({
//       message: "The token is invalid or revoked!",
//     });
//   }
// };

// let sign = async (req, res) => {
//   const body = req.body;
//   const message = body.message;
//   const publicKey = body.publicKey;
//   const privateKey = body.privateKey;
//   const isExist = await getByPublicKey(publicKey);
//   if (isExist) {
//     if (isExist.status === 1) {
//       const priv = Forge.pki.privateKeyFromPem(privateKey);
//       let pss = Forge.pss.create({
//         md: Forge.md.sha512.create(),
//         mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
//         saltLength: 20,
//       });
//       let md = Forge.md.sha512.create();
//       md.update(message);
//       const signature = Forge.util.encode64(priv.sign(md, pss));
//       return res.status(200).json({
//         SIGN: {
//           message: message,
//           publicKey: publicKey,
//           signature: signature,
//         },
//       });
//     }
//   }
//   return res.status(403).send({
//     message: "The public key is invalid or revoked!",
//   });
// };

// let verify = async (req, res) => {
//   const body = req.body;
//   const SIGN = body.SIGN;
//   const message = SIGN.message;
//   const publicKey = Forge.pki.publicKeyFromPem(SIGN.publicKey);
//   const signature = SIGN.signature;
//   try {
//     pss = Forge.pss.create({
//       md: Forge.md.sha512.create(),
//       mgf: Forge.mgf.mgf1.create(Forge.md.sha512.create()),
//       saltLength: 20,
//     });
//     md = Forge.md.sha512.create();
//     md.update(message);

//     let verified = publicKey.verify(
//       md.digest().getBytes(),
//       Forge.util.decode64(signature),
//       pss
//     );

//     return res.status(200).json({ verified });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };

let getPKIs = async (req, res) => {
  const pkis = await getAllPkis();
  return res.status(200).json(pkis);
};

let changeStatus = async (req, res) => {
  try {
    const body = req.body;
    const Username = body.Username;
    const Password = body.Password;
    const IdPki = body.IdPki;
    const NewStatus = body.NewStatus;
    if (!Username || !Password) {
      return res.status(403).send({
        message: "Username and Password is required!",
      });
    }
    if (!IdPki) {
      return res.status(403).send({
        message: "IdPki is required!",
      });
    }
    if (!NewStatus) {
      return res.status(403).send({
        message: "NewStatus is required!",
      });
    }
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
      if (IdPki) {
        await changeStatusPkiById(IdPki, IdUserRemover, Identity, NewStatus);
        return res.status(201).send({
          message: `The PKI ${IdPki} is changed status to ${NewStatus} !`,
        });
      } else {
        return res.status(403).send({
          message: "Id is not Found!",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
let getIdentity = async (req, res) => {
  try {
    const body = req.body;
    const Username = body.Username;
    const Password = body.Password;
    if (!Username || !Password) {
      return res.status(404).send({
        message: "Username and Password is required!",
      });
    }
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
      return res.status(200).json(Identity);
    } else {
      return res.status(500).send({
        message: "error!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "error!",
    });
  }
};
module.exports = {
  getPKIs: getPKIs,
  changeStatus: changeStatus,
  getIdentity: getIdentity,
};
