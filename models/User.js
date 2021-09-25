let knex = require("../database/config");

class User{
    async new(NAME,CPF,AGE,GENDER){
        try {
            let id = await knex.insert({NAME,CPF,AGE,GENDER}).table("users");
            return {ID:id[0],NAME:NAME,AGE:AGE,GENDER:GENDER}
        }
        catch (error){
            console.log(error);
            return false;
        }

    }
    async findAll(){
        try {
            return await knex.select(["rowid","NAME","AGE","GENDER"]).from("users");
        }
        catch (error){
            console.log(error);
            return [];
        }
    }
    async findByCPF(CPF){
        try {
            let result = await knex.select(["rowid","NAME","AGE","GENDER"]).from("users").where({CPF:CPF});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            return false;
        }
    }
    async findByID(USER_ID){
        try {
            let result = await knex.select(["rowid","NAME","AGE","GENDER"]).from("users").where({rowid:USER_ID});
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

module.exports = new User();