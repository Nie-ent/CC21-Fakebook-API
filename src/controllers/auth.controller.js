import createHttpError from "http-errors"
import identityKeyUtils from "../utils/identity-key-utils.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { registerSchema } from "../validations/schema.js"

// @ts-nocheck
export async function register(req, res, next) {

    const { identity, firstName, lastName, password, confirmPassword } = req.body

    const rs = registerSchema.parse(req.body)

    console.log('rs =>', rs)

    // if (confirmPassword !== password) {
    //     return next(createHttpError(400, 'check confirm-password'))
    // }

    const identityKey = identityKeyUtils(identity)


    if (!identityKey) {
        return next(createHttpError(400, 'identity must be email or phone number'))
    }

    const haveUser = await prisma.user.findUnique({
        where: { [identityKey]: identity }
    })

    if (haveUser) {
        return next(createHttpError(409, 'This user already register'))
    }

    const newUser = {
        [identityKey]: identity,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName
    }

    const newUserResult = await prisma.user.create({ data: newUser })

    res.json({ newUserResult })
}

export function login(req, res, next) {

    if (req.body.password === "a1234") {
        return next(createHttpError[400]('bad password'))
    }

    res.json({
        msg: 'Login Controller',
        body: req.body
    })
}

export const getMe = (req, res) => {
    res.json({ msg: 'GetMe controller' })
}
