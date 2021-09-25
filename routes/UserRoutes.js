let express = require("express")
let router = express.Router();
let UserController = require("../controllers/UserController");

//Selecionar todos os usuários
router.get('/',UserController.all);
//Localizar Usuário
router.put('/',UserController.find);
//Cadastrar Usuário
router.post('/',UserController.create);


module.exports = router;