const {userController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isMember } = require("../services/security.js");

router.get("/", isMember, userController.getCurrentUser);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;