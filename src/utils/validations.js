import Joi from "joi";

export default class Validations{
    static UserValidation () {
        return Joi.object({
            name:Joi.string()
                .required()
                .min(3)
                .error(Error("name is invalid"))
                .max(100),
            surname:Joi.string()
                .required()
                .min(3)
                .error(Error("surname is invalid"))
                .max(100),
            phone:Joi.string()
                .pattern(/^9989[012345789][0-9]{7}$/)
                .required()
                .error(Error("Phone number is invalid")),
            password:Joi.string()
                .required()
                .min(4)
                .max(100)
                .error(Error("invalid password!"))
        })
    }

    static codeValidation () {
        return Joi.object({
            code: Joi.number()
                .required()
                .min(10000)
                .max(99999)
                .error(Error("Invalid code!"))
        })
    }

    static loginValidation () {
        return Joi.object({
            password:Joi.string()
                .required()
                .min(4)
                .max(100)
                .error(Error("invalid password!")),
            phone:Joi.string()
                .pattern(/^9989[012345789][0-9]{7}$/)
                .required()
                .error(Error("Phone number is invalid"))
        })
            
    }

    static MotiveValidation() {
        return Joi.object({
            motive:Joi.string()
                .required()
                .error(Error("motivation text is invalid"))
        })
    }

    static RoleValidation() {
        return Joi.object({
            role:Joi.string()
                .required()
                .valid("student","sponsor")
                .error(Error("role is invalid"))
        })
    }

    static AvtivateValidation() {
        return Joi.object({
            data:Joi.boolean()
                .required()
                .error(Error("data is invalid"))
        })
    }
}