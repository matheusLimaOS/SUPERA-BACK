let knex = require("../database/config");

class Schedules{
    async findByUser(USER_ID){
        try {
            let result = await knex.select(["rowid","PLACE_ID","USER_ID","DATE","TIME"]).from("schedules").where({USER_ID:USER_ID});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
    async scheduled(rowid,USER_ID){
        try {
            await knex.update({USER_ID}).table("schedules").where({rowid});
            return true;
        }
        catch (error){
            console.log(error);
            return error;
        }

    }
    async new(USER_ID,PLACE_ID,DATE,TIME){
        try {
            let id = await knex.insert({USER_ID,PLACE_ID,DATE:DATE,TIME:TIME}).table("schedules");
            return {ID:id[0],USER_ID:USER_ID,PLACE_ID:PLACE_ID,DATE:DATE,TIME:TIME}
        }
        catch (error){
            console.log(error);
            return error;
        }

    }
    async findByPlaceAndDate(PLACE_ID,DATE){
        try {
            let result = await knex.select(["rowid","PLACE_ID","USER_ID","DATE","TIME"]).from("schedules").where({PLACE_ID:PLACE_ID,DATE:DATE});
            if(result[0])
                return result;
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
    async findByPlaceAndDateUserIDNULL(PLACE_ID,DATE){
        try {
            let result = await knex.select(["rowid","PLACE_ID","USER_ID","DATE","TIME"]).from("schedules").where({PLACE_ID:PLACE_ID,DATE:DATE,USER_ID:null});
            if(result[0])
                return result;
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
    async cancel(USER_ID){
        try {
            await knex.update({USER_ID:null}).table("schedules").where({USER_ID});
            return true;
        }
        catch (error){
            console.log(error);
            return false;
        }

    }
}

module.exports = new Schedules();