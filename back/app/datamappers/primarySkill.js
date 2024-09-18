const client = require("../services/pgClient");
const APIError = require("../services/errorHandler/APIError");

const primarySkillDataMapper = {
    async findAll() {
        const sqlQuery = "SELECT * FROM get_all_primary_skills();";

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery);
            result = response.rows;
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async findById(id){
        const sqlQuery = "SELECT * FROM find_primary_skill_by_id($1);";
        const values = [id];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);

            if(response.rows[0].id != null){
                result = response.rows[0];
            }
            else{

                error = new APIError("Aucune compétence primaire trouvée avec cet id",404);
            }
            
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async create(primarySkill) {
        const sqlQuery = "SELECT * FROM insert_primary_skill($1);";
        const values = [primarySkill];

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

    async update(primarySkill){
        const sqlQuery = "SELECT * FROM update_primary_skill($1);";
        const values = [primarySkill];

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
        const sqlQuery = "SELECT * FROM delete_primary_skill($1);";
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

    async link(primarySkill) {
        const sqlQuery = "SELECT * FROM link_primary_skills_races($1);";
        const values = [primarySkill];

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
};

module.exports = primarySkillDataMapper;