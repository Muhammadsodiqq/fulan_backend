import userRoute from "./userRoute.js"
import fileRoute from "./fileRoute.js";
export default (app) => {
    app.use(userRoute.path,userRoute.router);
    app.use(fileRoute.path,fileRoute.router);
}