const classRouter = require("./class");
const specializationRouter = require("./specialization");
const magicRouter = require("./magic");
const raceRouter = require("./race");
const primaryStatisticRouter = require("./primaryStatistic");
const primarySkillRouter = require("./primarySkill");
const characterRouter = require("./character");
const userRouter = require("./user");

const {Router} = require("express");

const errorModule = require("../services/errorHandler");

const router = Router();

router.use("/classes",classRouter);
router.use("/specializations",specializationRouter);
router.use("/magics",magicRouter);
router.use("/races", raceRouter);
router.use("/primary_statistics",primaryStatisticRouter);
router.use("/primary_skills",primarySkillRouter);
router.use("/characters",characterRouter);
router.use("/user",userRouter);

router.use(errorModule.manage);

module.exports = router;