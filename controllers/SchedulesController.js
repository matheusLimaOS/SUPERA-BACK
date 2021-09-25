let Schedules = require("../models/Schedules");
let Places = require("../models/Places");
let User = require("../models/User");

class SchedulesController{
    async create(req,res){
        let {rowid,USER_ID} = req.body;

        let valida = await Schedules.findByUser(USER_ID);

        if(valida!==false){
            res.status(401);
            res.json({message:"Usuário já possui agendamento!",schedule:valida});
            return;
        }
        try{
            valida = await Schedules.scheduled(rowid,USER_ID);
            res.status(200);
            res.json({message:"Agendamento criado com sucesso!",schedule:valida});
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async findByUserID(req,res) {
        let id = req.params.id;
        let schedule = await Schedules.findByUser(id);
        let USER_NAME = await User.findByID(id);
        let PLACE_NAME = await Places.findByID(schedule.PLACE_ID);
        let datas = {
            rowid:schedule.rowid,
            USER_NAME:USER_NAME.NAME,
            PLACE_NAME:PLACE_NAME.NAME,
            DATE:schedule.DATE,
            TIME:schedule.TIME
        }

        try{
            res.status(200);
            res.json(datas);
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async findByDatePlace(req,res) {
        let {DATE,PLACE_ID} = req.body;

        let valida = await Schedules.findByPlaceAndDate(PLACE_ID,DATE);

        if(valida!==false){
            valida = await Schedules.findByPlaceAndDateUserIDNULL(PLACE_ID,DATE);

            if(valida===false){
                res.status(404);
                res.json({message:"Este dia está lotado. Por favor selecione outro!"});
                return;
            }

            res.status(200);
            res.json(valida);
        }
        else{
            valida = await  Places.findByID(PLACE_ID);
            let TIME = valida.OPEN_TIME.split(':');
            let TIME2 = valida.CLOSE_TIME.split(':');
            let TIME3 = '';
            let HOUR = parseInt(TIME[0]);
            let MINUTES = parseInt(TIME[1]);
            let HOUR2 = parseInt(TIME2[0]);

            while(1){
                if(MINUTES === 60){
                    MINUTES = 0;
                    HOUR+=1;
                }
                if(HOUR === HOUR2){
                    res.status(200);
                    res.json(await Schedules.findByPlaceAndDateUserIDNULL(PLACE_ID,DATE));
                    return;
                }
                TIME3 = (HOUR<10 ? '0'+HOUR : HOUR) + ':' + (MINUTES<10 ? '0'+ MINUTES : MINUTES);
                await Schedules.new(null,PLACE_ID,DATE,TIME3);

                MINUTES+=valida.INTERVAL;
            }
        }
    }
    async cancel(req,res) {
        let id = req.params.id;
        try{
            await Schedules.cancel(id);

            res.status(200);
            res.json({message:"Agendamento cancelado com sucesso!"})
        }
        catch (err){
            res.status(500);
            res.json({message:"Erro interno do sistema!"})
        }


    }
}

module.exports = new SchedulesController;
