import  Express  from "express";
import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.post("/sign-up", userController.SignUp);
router.post("/validate-code", userController.validateCode);
router.post("/login", userController.Login)
router.get("/get",authMiddleware, userController.getOneUser)
router.post("/set-motivate",authMiddleware, userController.setMotivation)
router.post("/set-role",authMiddleware, userController.setUserRole)
router.get("/",authMiddleware, userController.getUsers)


export default {
    path:"/users",
    router
}