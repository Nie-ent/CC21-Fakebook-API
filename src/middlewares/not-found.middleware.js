export default (req, res, next) => {
    return next(createHttpError.NotFound())
}