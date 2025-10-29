import { ZodError } from "zod"

export default (err, req, res, next) => {

    if (err.name === 'ZodError') {
        return res.status(400).json({
            success: false,
            errors: err.issues
        })
    }

    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        msg: err.message || 'Server error'
    })
}