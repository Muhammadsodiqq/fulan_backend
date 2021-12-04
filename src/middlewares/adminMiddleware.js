export default async (req,res,next)=> {
    try {
        const user = await req.db.users.findOne({
            where:{
                user_id:req.user
            }
        })

        if(!(user.dataValues.user_role == "admin" || user.dataValues.user_role == "superadmin")){
            throw new Error("You don't have permission")
        }

        req.isSuperAdmin = user.dataValues.user_role == "superadmin"
        req.isAdmin = user.dataValues.user_role == "admin"
        next()
    } catch (error) {
        res.status(403).json({
            ok: false,
            message: error + ""
        }) 
    }
}