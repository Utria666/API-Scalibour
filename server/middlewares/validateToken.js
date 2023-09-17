export const authRequired = (req, res, next) => {
const token = req.cookies.token;
    next()
}	