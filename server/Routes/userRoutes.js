const express = require("express");
const {
  signUpUser,
  loginUSer,
  logoutUser,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUSer);
router.post("/logout", logoutUser);
module.exports = router;
