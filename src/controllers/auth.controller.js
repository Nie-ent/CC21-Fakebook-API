import createHttpError from "http-errors"
import identityKeyUtils from "../utils/identity-key-utils.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { loginSchema, registerSchema } from "../validations/schema.js"
import jwt from 'jsonwebtoken'
import { createUser, getUserBy } from "../services/user.service.js"

// @ts-nocheck
export async function register(req, res, next) {

    const { identity, firstName, lastName, password, confirmPassword } = req.body

    const rs = registerSchema.parse(req.body)

    const identityKey = identityKeyUtils(identity)


    if (!identityKey) {
        return next(createHttpError(400, 'identity must be email or phone number'))
    }

    const haveUser = await getUserBy(identityKey, identity)

    if (haveUser) {
        return next(createHttpError(409, 'This user already register'))
    }

    const newUser = {
        [identityKey]: identity,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName
    }

    const newUserResult = await createUser(newUser)

    res.json({ newUserResult })
}

export const login = async (req, res, next) => {

    const { identity, password } = req.body
    const user = loginSchema.parse(req.body)
    const identityKey = user.identity.type
    const identityValue = user.identity.value

    const foundUser = await getUserBy(identityKey, identity)

    console.log('foundUser', foundUser)

    if (!foundUser) {
        return next(createHttpError[401]('Invalid Login'))
    }

    let pwOk = await bcrypt.compare(password, foundUser.password)
    if (!pwOk) {
        return next(createHttpError[401]('Invalid Login'))
    }

    const { password: pw, createdAt, updatedAt, ...data } = foundUser

    const payload = { id: foundUser.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: '15d'
    })


    res.json({
        msg: 'Login successful',
        token: token,
        user: { ...data }

    })

}


export const getMe = (req, res) => {
    res.json({ user: req.user })
}
