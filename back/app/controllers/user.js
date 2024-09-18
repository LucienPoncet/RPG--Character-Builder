const { userDataMapper } = require("../datamappers");
const JWT = require("../services/jwt.js");

const userController = {
    async signup(req,res,next){
        
        const {error,result} = await userDataMapper.addUser(req.body);

        if(error){
            next(error);
        }
        else{
            res.json(result);
        }
    },

    async signin(req,res,next){
        
        const {error,result} = await userDataMapper.verifyUser(req.body);

        const user = result.verify_user;

        if(user){
            const token = JWT.encode(user);
            user.token = token;
        }

        if(error){
            next(error);
        }
        else{
            res.json(user);
        }

    },

    async getCurrentUser(req,res,next){

        const token = req.get("Authorization");

        const user = JWT.decode(token);

        const {result, error} = await userDataMapper.getUser(user.result.id) ;

            if(error){
                next(error);
            }
            else{
                res.json(result);
            }

    }
};

module.exports = userController;
