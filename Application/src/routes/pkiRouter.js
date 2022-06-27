const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const pkiCtr = require("../controlers/pkiCtr");

//router.get("/createPKI", pkiCtr.createPKI);
//router.post("/sign", pkiCtr.sign);
//router.post("/verify", pkiCtr.verify);
//router.use(authMiddleware.isAdmin);
router.get("/getAll", pkiCtr.getPKIs);
router.get("/myPki", pkiCtr.getIdentity);
router.post("/changeStatusPki", pkiCtr.changeStatus);
module.exports = router;
