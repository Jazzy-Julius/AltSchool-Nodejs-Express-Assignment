const checkBody = (req, res, next) => {
    if(!req.body.username || !req.body.username.trim()) {
        return res.status(401).json({
            message: "username required, provide one"
        })
    }
    if (!req.body.password ||  !req.body.password.trim()) {
        return res.status(401).json({
            message: "password required, please provide one"
        })
    }
    next()
}

module.exports = {checkBody}