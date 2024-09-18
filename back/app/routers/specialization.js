const {specializationController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, specializationController.getAllSpecializations);
router.post('/', isAdmin, specializationController.createOneSpecialization);
router.get('/:id(\\d+)', isAdmin, specializationController.getOneSpecialization);
router.patch('/:id(\\d+)', isAdmin, specializationController.updateOneSpecialization);
router.delete('/:id(\\d+)', isAdmin, specializationController.deleteOneSpecialization);

module.exports = router;