const {raceController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, raceController.getAllRaces);
router.post('/', isAdmin, raceController.createOneRace);
router.get('/:id(\\d+)', isAdmin, raceController.getOneRace);
router.patch('/:id(\\d+)', isAdmin, raceController.updateOneRace);
router.delete('/:id(\\d+)', isAdmin, raceController.deleteOneRace);

module.exports = router;