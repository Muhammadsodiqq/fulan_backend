import  Express  from "express";
import Cors from "cors";
import Morgan from "morgan";
import Helmet from "helmet";
import Path from "path";
import http from "http";
import dotenv from "dotenv";
import data from "./modules/postgres.js";
import routes from "./routes/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from './swagger.js'

dotenv.config();




async function main() {
    const app = Express();
    const server = http.createServer(app);
    let db = await data();
    //dirname
    const __dirname = Path.resolve(Path.dirname(""));


    //middlewares
    app.use(Express.json());
    app.use(Express.urlencoded({extended:true}));
    app.use(Cors());
    app.use(Helmet());
    app.use(Morgan("dev"));
    app.use(async function (req,res,next) {
        req.db = db
        next()
    })

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    routes(app)
    
    server.listen(process.env.PORT, _ => console.log("Server redy at port " + process.env.PORT));
}
 
main()