const jwt = require('jsonwebtoken');

const JWT = {

    encode(user){
        return jwt.sign(user, process.env.JWT_SECRET);
    },

    decode(token){
        let result;
        let error;
        try{
            result = jwt.verify(token,process.env.JWT_SECRET);
        }catch(err){
            error = new Error("Hop hop hop, qu'est ce que tu fais là ?");
        }
        return {result,error};
    }
};

module.exports = JWT;