const {characterController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isMember } = require("../services/security.js");

router.get('/', isMember, characterController.getCharacters);
router.get('/all', characterController.getAllCharacters);
router.post('/', isMember, characterController.createOneCharacter);
router.get('/:id(\\d+)', characterController.getOneCharacter);
router.patch('/:id(\\d+)', isMember, characterController.updateOneCharacter);
router.delete('/:id(\\d+)', isMember, characterController.deleteOneCharacter);

module.exports = router;