const {primaryStatisticController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, primaryStatisticController.getAllPrimaryStatistics);
router.post('/', isAdmin, primaryStatisticController.createOnePrimaryStatistic);
router.post('/races', isAdmin, primaryStatisticController.linkPrimaryStatisticRaces);
router.get('/:id(\\d+)', isAdmin, primaryStatisticController.getOnePrimaryStatistic);
router.patch('/:id(\\d+)', isAdmin, primaryStatisticController.updateOnePrimaryStatistic);
router.delete('/:id(\\d+)', isAdmin, primaryStatisticController.deleteOnePrimaryStatistic);

module.exports = router;