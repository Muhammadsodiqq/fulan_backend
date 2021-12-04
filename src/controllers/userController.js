import  Sequelize  from "sequelize";
import Validations from "../utils/validations.js";
import bcrypt from "../modules/bcrypt.js";
import rn from "random-number";
import sms from "../modules/sms.js";
import jwt from "../modules/jwt.js";
const {Op} = Sequelize

export default class userController {
    static async SignUp(req,res) {
        try {
            let data = await Validations.UserValidation().validateAsync(req.body);

            let userIsExists = await req.db.users.findOne({
                where:{
                 user_phone:{
                     [Op.like]:  `%${data.phone}%`
                 }
                }
            })
            console.log(userIsExists);
            if (userIsExists) throw ("User already exists");

            const user = await req.db.users.create({
                user_name: data.name,
                user_lastName:data.surname,
                user_phone: data.phone,
                user_password: await bcrypt.genHash(data.password)
            })

            const gen = rn.generator({
                min: 10000,
                max: 99999,
                integer: true
            })

            const genNumber = gen();

            let attempts = await req.db.attempts.create({
                code:genNumber,
                user_id:user.user_id
            })
            await sms.sendSmsTo(data.phone,`your code ${genNumber}`)
            res.status(200).json({
                ok: true,
                message: 'Code sent on your device',
                data: {
                    user: user.dataValues,
                    code_id: attempts.dataValues.id
                },
            })
        } catch (error) {
            if (error === 'SequelizeUniqueConstraintError: Validation error') {
                error = 'This phone or email is already exists'
            }
            return res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async validateCode(req,res) {
        try {
            const validationId = req.headers['code-validation-id'];
            if (!validationId) throw new Error('Invalid validation token!');

            const attempt = await req.db.attempts.findOne({
                where: {
                    id: validationId
                },
                include: {
                    model: req.db.users,
                }
            })

            if (!attempt) throw new Error('Validation code is not found!');

            const { code } = await Validations.codeValidation().validateAsync(req.body);

            if (Number(code) !== Number(attempt.dataValues.code)) {
                throw ("Your validation code is incorrect!")
            }

            const token = jwt.genToken({
                id:attempt.dataValues.user.dataValues.user_id
            })

            res.status(201).json({
                ok: true,
                message: "Logged in!",
                data: {
                    token
                }
            })

        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async Login (req,res) {
        try {
            let data = await Validations.loginValidation().validateAsync(req.body);

            const user = await  req.db.users.findOne({
                where:{
                    user_phone:data.phone
                }
            });

            if(!user) throw "User is not exists!";
            const isValid = await bcrypt.compareHash(data.password,user.dataValues.user_password )

            if(!isValid) throw "password is incorrect";

            res.status(200).json({
                ok:true,
                message:"Successfully logged",
                token:await jwt.genToken({
                    id:user.dataValues.user_id
                }),
                data:user.dataValues,
            })

            
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async getOneUser(req,res) {
        try {
            const user = await req.db.users.findOne({
                where:{
                    user_id:req.user
                },
                include:{
                    model:req.db.motive
                }
            });
             res.status(200).json({
                ok: true,
                data: user
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }

    static async setMotivation(req,res) {
        try {
            let data = await Validations.MotiveValidation().validateAsync(req.body);


            const user = await req.db.users.findOne({
                where:{
                    user_id:req.user
                },
                include:{
                    model:req.db.motive
                }
            });
            if(user.dataValues.user_role != "student")  throw "you can't set motivation text";

            await req.db.motive.destroy({
                where:{
                    user_id:req.user
                },
            });

            let motive = await req.db.motive.create({
                text:data.motive,
                user_id:req.user
            })

            res.status(200).json({
                ok: true,
                data: user
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }

    static async setUserRole (req,res) {
        try {
            let data = await Validations.RoleValidation().validateAsync(req.body);

            const user = await req.db.users.update({
                user_role:data.role,
            },{
                where:{
                    user_id:req.user
                }
            });
            console.log(user);

            res.status(200).json({
                ok: true,
                data: "succesfuly created"
            })

        } catch (error) {
            res.status(400).json({
                ok: true,
                message: error + ""
            })
        }
    }
    static async getUsers(req,res) {
        try {
            const user = await req.db.users.findAll({
                include:{
                    model:req.db.motive
                }
            });
            res.status(200).json({
                ok: true,
                data: user
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}