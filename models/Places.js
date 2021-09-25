let knex = require("../database/config");

class Places{
    async findAll(){
        try {
            return await knex.select(["rowid","NAME","CITY","INTERVAL"]).from("places");
        }
        catch (error){
            console.log(error);
            return [];
        }
    }
    async new(NAME,CITY,INTERVAL,OPEN_TIME,CLOSE_TIME){
        try {
            let id = await knex.insert({NAME,CITY,INTERVAL,OPEN_TIME,CLOSE_TIME}).table("places");
            return {ID:id[0],NAME:NAME,CITY:CITY,INTERVAL:INTERVAL,OPEN_TIME:OPEN_TIME,CLOSE_TIME:CLOSE_TIME}
        }
        catch (error){
            console.log(error);
            return false;
        }

    }
    async findByNAME(NAME){
        try {
            let result = await knex.select("*").from("places").where({NAME:NAME});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
    async findByID(PLACE_ID){
        try {
            let result = await knex.select("*").from("places").where({rowid:PLACE_ID});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
}

module.exports = new Places();