const { primaryStatisticDataMapper } = require("../datamappers");

const primaryStatisticController = {
    async getAllPrimaryStatistics(_,res){
        const { result, error } = await primaryStatisticDataMapper.findAll();
        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async createOnePrimaryStatistic(req, res, next) {
        const { result, error } = await primaryStatisticDataMapper.create(req.body);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async getOnePrimaryStatistic(req,res,next){
        const { result, error } = await primaryStatisticDataMapper.findPById(req.params.id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async updateOnePrimaryStatistic(req,res,next){
        let {result,error} = await primaryStatisticDataMapper.findById(req.params.id);

        if(error){
            next(error);
        }
        else{

            let primaryStatistic = { ...result, ...req.body };

            const resultUpdate = await primaryStatisticDataMapper.update(primaryStatistic);

            if (resultUpdate.error) {
                next(error);
            }
            else {
                res.json(resultUpdate.result);
            }
        }
    },

    async deleteOnePrimaryStatistic(req,res,next){
        const { result, error } = await primaryStatisticDataMapper.delete(req.params.id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async linkPrimaryStatisticRaces(req, res, next) {
        const { result, error } = await primaryStatisticDataMapper.link(req.body);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

};

module.exports = primaryStatisticController;