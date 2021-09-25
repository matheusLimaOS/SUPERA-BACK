let bodyParser = require("body-parser");
let express = require("express");
let app = express();
let cors = require("cors");
let UserRouter = require("./routes/UserRoutes");
let PlacesRouter = require("./routes/PlacesRoutes");
let SchedulesRouter = require("./routes/SchedulesRoutes");

//Liberando acesso do CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,authorization");
    app.use(cors);
    next();
})

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Meus Routers (Usuário,Locais,Agendamentos)
app.use("/user",UserRouter);
app.use("/places",PlacesRouter);
app.use("/schedules",SchedulesRouter);

//colocando no ar
app.listen(8686,()=> {
    console.log("App rodando!");
})

