const { primarySkillDataMapper } = require("../datamappers");

const primarySkillController = {
    async getAllPrimarySkills(_,res){
        const { result, error } = await primarySkillDataMapper.findAll();
        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async createOnePrimarySkill(req, res, next) {
        const { result, error } = await primarySkillDataMapper.create(req.body);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async getOnePrimarySkill(req,res,next){
        const { result, error } = await primarySkillDataMapper.findPById(req.params.id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async updateOnePrimarySkill(req,res,next){
        let {result,error} = await primarySkillDataMapper.findById(req.params.id);

        if(error){
            next(error);
        }
        else{

            let primarySkill = { ...result, ...req.body };

            const resultUpdate = await primarySkillDataMapper.update(primarySkill);

            if (resultUpdate.error) {
                next(error);
            }
            else {
                res.json(resultUpdate.result);
            }
        }
    },

    async deleteOnePrimarySkill(req,res,next){
        const { result, error } = await primarySkillDataMapper.delete(req.params.id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },
    
    async linkPrimarySkillRaces(req, res, next) {
        const { result, error } = await primarySkillDataMapper.link(req.body);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },
};

module.exports = primarySkillController;