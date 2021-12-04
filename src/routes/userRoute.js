import  Express  from "express";
import userController from "../controllers/userController.js"
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Express.Router();
import fileUpload from "express-fileupload";


const options = {
    safeFileNames: true
}

router.post("/sign-up", userController.SignUp);
router.post("/validate-code", userController.validateCode);
router.post("/login", userController.Login)
router.get("/get",authMiddleware, userController.getOneUser)
router.post("/set-motivate",authMiddleware, userController.setMotivation)
router.post("/set-role",authMiddleware, userController.setUserRole)
router.get("/",authMiddleware, userController.getUsers)
router.post("/actiavate", [authMiddleware,adminMiddleware], userController.ActivateUser)
router.get("/get/all-students", [authMiddleware,adminMiddleware], userController.getAllStudents)
router.post("/set-file", [fileUpload("file", options),authMiddleware], userController.setFile)

export default {
    path:"/users",
    router
}