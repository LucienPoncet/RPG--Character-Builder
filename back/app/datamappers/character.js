const client = require("../services/pgClient");
const APIError = require("../services/errorHandler/APIError");

const characterDataMapper = {
    async findAll(id) {
        const sqlQuery = `SELECT * FROM get_all_characters_by_user($1);`;
        const values = [id];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery, values);
            result = response.rows;
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async findAllCharacters() {
        const sqlQuery = `SELECT * FROM get_all_characters();`;

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery);
            result = response.rows;
        }
        catch (err) {
            error = err;
            console.log(err)
        }

        return {result,error};
    },

    async findById(id){
        const sqlQuery = "SELECT * FROM find_character_by_id($1);";
        const values = [id];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);

            if(response.rows[0].id != null){
                result = response.rows[0];
            }
            else{

                error = new APIError("Aucun personnage trouvé avec cet id",404);
            }
            
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async create(character) {
        const sqlQuery = "SELECT * FROM insert_character($1);";
        const values = [character];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async update(character){
        const sqlQuery = "SELECT * FROM update_character($1);";
        const values = [character];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },
    
    async delete(id){
        const sqlQuery = "SELECT * FROM delete_character($1);";
        const values = [id];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);

            result = response.rowCount == 1;
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },
};

module.exports = characterDataMapper;