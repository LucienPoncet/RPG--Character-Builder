const client = require("../services/pgClient");
const APIError = require("../services/errorHandler/APIError");

const userDataMapper = {
    async addUser(user){
        const sqlQuery = "SELECT * FROM add_user($1);";
        const values = [user];

        let result;
        let error;

        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        } catch(err) {
            error = err;
        }

        return {result,error};
    },

    async verifyUser(user){
        const sqlQuery = "SELECT * FROM verify_user($1);";
        const values = [user];

        let result;
        let error;

        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        } catch(err) {
            error = err;
        }

        return {result,error};
    },

    async getUser(id){
        const sqlQuery = "SELECT * FROM get_user($1);";
        const values = [id];

        let result;
        let error;

        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        } catch(err) {
            error = err;
        }
        return {result,error};
    },

}

module.exports = userDataMapper;