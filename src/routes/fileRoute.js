import  Express  from "express";

import path from "path"
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Express.Router();

const __dirname = path.resolve(path.dirname(""))


router.use("/getfile", Express.static(path.join(__dirname,"src","public","files")))

export default {
    path:"/files",
    router
}