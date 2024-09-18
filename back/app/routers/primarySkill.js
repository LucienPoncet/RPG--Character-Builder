const {primarySkillController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, primarySkillController.getAllPrimarySkills);
router.post('/', isAdmin, primarySkillController.createOnePrimarySkill);
router.post('/races', isAdmin, primarySkillController.linkPrimarySkillRaces);
router.get('/:id(\\d+)', isAdmin, primarySkillController.getOnePrimarySkill);
router.patch('/:id(\\d+)', isAdmin, primarySkillController.updateOnePrimarySkill);
router.delete('/:id(\\d+)', isAdmin, primarySkillController.deleteOnePrimarySkill);

module.exports = router;