const fs = require("fs");

const checkApi_Key = (req, res, next) =>  {
    const userData = fs.readFileSync("./db/users.json")
    const userDB = JSON.parse(userData)

    const apiKey = req.headers.api_key
    if(!apiKey) {
        return res.status(401).json ({
            message: "authentification failed, please provied api key"
        })
    }

    const foundUser = userDB.find((user) => user.api_key === apiKey)  
    if (!foundUser) {
        return res.status(401).json({
            message: "authentification failed"
        })
    }
    next()
}

const checkAdmin = (req, res, next) => {
    const usersData = fs.readFileSync("./db/users.json")
    const userDB = JSON.parse(usersData)

    const apiKey = req.headers.api_key

    const foundUser = userDB.find(user=> user.api_key === apiKey)
    if(foundUser.user_type !="admin"){
        return res.status(403).json({
            message: "you are unauthorized"
        })
    }
    next()
}

const checkItems = (req, res, next) => {
    const items = ["pork", "alchohol"]
    if (items.includes(req.body.name)) {
        return res.status(406).json ({
            error: "this item is prohibited"
        })
    }
    next()
}

module.exports = {
    checkApi_Key,
    checkAdmin,
    checkItems
}