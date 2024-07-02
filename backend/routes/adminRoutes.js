const adminControllers = require("../../backend/controllers/AdminController");

const router = require("express").Router();

router.post("/signup", adminControllers.signup);
router.post("/login", adminControllers.login);
router.post("/logout", adminControllers.logout);

module.exports = router;
