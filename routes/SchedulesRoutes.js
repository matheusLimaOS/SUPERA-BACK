let express = require("express")
let router = express.Router();
let SchedulesController = require("../controllers/SchedulesController");

//Agendamentos por usuário
router.get('/:id',SchedulesController.findByUserID);

//Agendamentos por data
router.put('/',SchedulesController.findByDatePlace);

//Cadastrar Agendamento
router.put('/new',SchedulesController.create);

//Cancelar Agendamento
router.put('/cancel/:id',SchedulesController.cancel);

module.exports = router;