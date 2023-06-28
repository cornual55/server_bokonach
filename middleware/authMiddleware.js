const jwt = require('jsonwebtoken')


module.exports = function (req,res,next){
if (req.method === "OPTIONS") {
    next()
}
        try {
        const token = req.headers.authorization.split(' ')[1]
             if (!token) {
                     return res.status(401).json("Не авторизован")
                 }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.admin = decoded
        next()
}   catch (e) {
    return res.status(401).json("Не авторизован2")

}



    //для ошибок действий пользователя для которых нужна авторизация
};
