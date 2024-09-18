const { characterDataMapper } = require("../datamappers");
const JWT = require("../services/jwt.js");

const characterController = {
    async getCharacters(req, res, next){

        const token = req.get("Authorization");

        const user = JWT.decode(token);

        const userId = user.result.id;

        const { result, error } = await characterDataMapper.findAll(userId);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async getAllCharacters(req, res, next){

        const { result, error } = await characterDataMapper.findAllCharacters();

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async createOneCharacter(req, res, next) {
        const { result, error } = await characterDataMapper.create(req.body);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async getOneCharacter(req,res,next){
        const { id } = req.params;
        const { result, error } = await characterDataMapper.findById(id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    async updateOneCharacter(req,res,next){
        let {result,error} = await characterDataMapper.findById(req.params.id);

        if(error){
            next(error);
        }
        else{

            let character = { ...result, ...req.body };

            const resultUpdate = await characterDataMapper.update(character);

            if (resultUpdate.error) {
                next(error);
            }
            else {
                res.json(resultUpdate.result);
            }
        }
    },

    async deleteOneCharacter(req,res,next){
        const { result, error } = await characterDataMapper.delete(req.params.id);

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

};

module.exports = characterController;