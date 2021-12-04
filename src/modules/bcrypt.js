import bcrypt from "bcrypt";

async function genHash(data) {
    return bcrypt.hash(data, await bcrypt.genSalt(10))
}

async function compareHash(data,crypt) {
    return bcrypt.compare(data,crypt)
}

export default {
    genHash,compareHash
}