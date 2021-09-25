let User = require("../models/User");
let Schedules = require("../models/Schedules");

class UserController{
    async all(req,res){
        try{
            res.status(200);
            res.json(await User.findAll());
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async find(req,res){
        let {CPF} = req.body;
        try{
            let user = await User.findByCPF(CPF);

            if(user===false){
                res.status(404);
                res.json({message:"Usuário não encontrado!"});
                return;
            }

            let userSchedule = await Schedules.findByUser(user.rowid);

            if(userSchedule === false){
                res.status(200);
                res.json({message:"Usuário localizado!",user,flag:false});
                return;
            }

            res.status(200);
            res.json({message:"Usuário localizado e já possui agendamento!",user,flag:true});
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async create(req,res){
        let {NAME,CPF,AGE,GENDER} = req.body;

        let valida = await User.findByCPF(CPF);

        if(valida !== false){
            res.status(401);
            res.json({message:"Usuário já cadastrado!"});
            return;
        }

        try{
            let user = await User.new(NAME,CPF,AGE,GENDER);
            res.status(200);
            res.json({message:"Usuário cadastrado com sucesso!",user});
        }
        catch(err){
            console.log(err);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
}

module.exports = new UserController;
