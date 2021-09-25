let express = require("express")
let router = express.Router();
let PlacesController = require("../controllers/PlacesController");


//Lista de todos os Locais
router.get('/',PlacesController.all);

//Cadastrar Local
router.post('/',PlacesController.create);

module.exports = router;