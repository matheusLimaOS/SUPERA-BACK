let Places = require("../models/Places");

class PlacesController{
    async all(req,res){
        try{
            res.status(200);
            res.json(await Places.findAll());
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async create(req,res){
        let {NAME,CITY,INTERVAL,OPEN_TIME,CLOSE_TIME} = req.body;

        let valida = await Places.findByNAME(NAME.toUpperCase());

        if(valida !== false){
            res.status(401);
            res.json({message:"Local já cadastrado!"});
            return;
        }

        try{
            let place = await Places.new(NAME.toUpperCase(),CITY,INTERVAL,OPEN_TIME,CLOSE_TIME);
            res.status(200);
            res.json(place);
        }
        catch(err){
            console.log(err);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
}

module.exports = new PlacesController;
