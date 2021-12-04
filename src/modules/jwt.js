import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

function genToken(data) {
    return Jwt.sign(data,process.env.secret_word)
}

function verifyToken (token) {
    try {
        return Jwt.verify(token,process.env.secret_word)
    } catch (error) {
        return false;
    }
}

export default {
    genToken,
    verifyToken
}