const client = require("../services/pgClient");
const APIError = require("../services/errorHandler/APIError");

const primaryStatisticDataMapper = {
    async findAll() {
        const sqlQuery = "SELECT * FROM get_all_primary_statistics();";

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
        const sqlQuery = "SELECT * FROM find_primary_statistic_by_id($1);";
        const values = [id];

        let result;
        let error;
        try {
            const response = await client.query(sqlQuery,values);

            if(response.rows[0].id != null){
                result = response.rows[0];
            }
            else{

                error = new APIError("Aucune statistique primaire trouvée avec cet id",404);
            }
            
        }
        catch (err) {
            error = err;
        }

        return {result,error};
    },

    async create(primaryStatistic) {
        const sqlQuery = "SELECT * FROM insert_primary_statistic($1);";
        const values = [primaryStatistic];

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

    async update(primaryStatistic){
        const sqlQuery = "SELECT * FROM update_primary_statistic($1);";
        const values = [primaryStatistic];

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
        const sqlQuery = "SELECT * FROM delete_primary_statistic($1);";
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

    async link(primaryStatistic) {
        const sqlQuery = "SELECT * FROM link_primary_statistics_races($1);";
        const values = [primaryStatistic];

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

module.exports = primaryStatisticDataMapper;