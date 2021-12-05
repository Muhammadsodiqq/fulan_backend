import  Sequelize  from "sequelize";
import Validations from "../utils/validations.js";
import bcrypt from "../modules/bcrypt.js";
import rn from "random-number";
import sms from "../modules/sms.js";
import jwt from "../modules/jwt.js";
import path from "path"
import fs from 'fs/promises'
const {Op} = Sequelize

let __dirname = path.resolve(path.dirname(''));


const getPagination = (page, size) => {
    const limit = size ? + size : 20;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

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
            console.log(genNumber);
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
                include:[
                    {
                        model:req.db.motive
                    },
                    {
                        model:req.db.file
                    }
                ]
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

            if(data.role == "sponsor") {

                await req.db.motive.destroy({
                    where:{
                        user_id:req.user
                    },
                });

                await req.db.users.update({
                    isActive:true
                },{
                    where:{
                        user_id:req.user
                    }
                })
            }
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
            const { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
            const user = await req.db.users.findAll({
                limit,
                offset,
                // where:{
                //     isActive:true
                // },
                include:[
                    {
                        model:req.db.motive
                    },
                    {
                        model:req.db.file
                    }
                ]
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

    static async ActivateUser(req,res) {
        try {
            const validationId = req.headers["user-id"]
            if (!validationId) throw "user_id is invalid";
            let data = await Validations.AvtivateValidation().validateAsync(req.body);

            // if(!req.isAdmin) throw " you can't do this action";
            // if(!req.isSuperAdmin) throw " you can't do this action";

            let user = await req.db.users.update({
                isActive:data.data,
            },{
                where:{
                    user_id:validationId
                }
            })

            res.status(200).json({
                ok: true,
                data: "succes"
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }

    static async getAllStudents(req,res) {
        try {
            const user = await req.db.users.findAll({
                where:{
                    user_role:"student"
                },
                include:[
                    {
                        model:req.db.motive
                    },
                    {
                        model:req.db.file
                    }
                ]
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

    static async getOneStudent(req,res) {
        try {
            const validationId = req.headers["user-id"]
            if (!validationId) throw "user_id is invalid";

            let user = await req.db.users.findOne({
                where:{
                    user_id:validationId,
                    user_role:"student"
                },
                include:[
                    {
                        model:req.db.motive
                    },
                    {
                        model:req.db.file
                    }
                ]
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

    static async getAllSponsors(req,res) {
        try {
            const user = await req.db.users.findAll({
                where:{
                    user_role:"sponsor"
                },
                
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

    static async getOneSponsor(req,res) {
        try {
            const validationId = req.headers["user-id"]
            if (!validationId) throw "user_id is invalid";

            let user = await req.db.users.findOne({
                where:{
                    user_id:validationId,
                    user_role:"sponsor"
                },
                
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

    static async setFile(req,res) {
        let fileBase
        let type
        try {
            const fileElement = req.files.file;
            if(!fileElement) throw new Error("File not found");
            if((fileElement.size / 1024) > (50 * 1024)) throw new Error("File size is over size")
            type = fileElement.name.split(".")[fileElement.name.split(".").length - 1]
            if (!(type == "png" || type == "jpg" || type == "jpeg")) throw "this is not picture";

            let oldFile = await req.db.file.findOne({
                where: {
                    user_id: req.user
                }
            })

            if(oldFile) {
                const filePath = path.join(__dirname,"src","public","files",`${oldFile.dataValues.photo_id}.`+ type);
                await fs.unlink(filePath)
            }

            await req.db.file.destroy({
                where: {
                    user_id: req.user
                }
            })

            const file = await req.db.file.create({
                type: type,
                user_id: req.user
            })

            fileBase = file;

            const filePath = path.join(__dirname,"src","public","files",`${file.dataValues.photo_id}.`+ type)
            await fs.writeFile(filePath,fileElement.data)
            await res.status(201).json({
                ok: true,
                message: "File uploaded",
                file
            })
        } catch (error) {
            console.log(error);
            if(fileBase) {
                const filePath = path.join(__dirname,"src","public","files",`${fileBase.dataValues.photo_id}.`+ type);
                await fs.unlink(filePath)
                await req.db.file.destroy({
                    where: {
                        user_id: fileBase.dataValues.photo_id
                    }
                })
            };
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}