import jwt from "../modules/jwt.js";

export default async(req,res,next)=> {
    try {
        const token = req.headers["authorization"];
        if (!token) throw new Error("Token is not found!");

        const data = jwt.verifyToken(token);

        if(!data) throw "Invalid token !";

        const user = await req.db.users.findOne({
            where:{
                user_id:data.id
            }
        })

        if (!user) throw new Error("User is not found!");

        req.user = user.dataValues.user_id;
        next()
    } catch (error) {
        res.status(403).json({
            ok: false,
            message: error + ''
        })
    }
}