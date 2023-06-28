const ApiError = require('../error/ApiError')
const {ADMIN} = require ('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generate = (id, LogAdmin, Rol) => {
    
    return jwt.sign({payload:{id, LogAdmin, Rol}}, 
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
        )

}
class AdminController {
    async Registr(req, res, next){
            const {LogAdmin, password, Rol} = req.body
            
            if (!LogAdmin || !password) {
                return next(ApiError.badRequest("Не все поля заполнены"))
            }
            const candidate = await ADMIN.findOne({where:{LogAdmin}})
            if (candidate) {
                return next(ApiError.badRequest('Администратор с таким логином уже существует'))
            }
            const HashUstalPassword = await bcrypt.hash(password, 6)
            const admin = await ADMIN.create({LogAdmin, Rol, password: HashUstalPassword})
            const token = generate(admin.id, admin.LogAdmin, admin.Rol)
                return res.json({token})
    }
    async login(req, res, next){
            const {LogAdmin, password , Rol} = req.body
            
            const admin = await ADMIN.findOne({where:{LogAdmin}})
            if (!admin){
                return next(ApiError.internal('Администратор не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, admin.password)
            if (!comparePassword){
                return next(ApiError.internal('Пароль не подошёл'))
            }
            const token = generate(admin.id, admin.LogAdmin, admin.Rol)
                return res.json({token})
    }

    async check(req, res, next){
            
        const token = generate(req.admin.id, req.admin.LogAdmin, req.admin.Rol)
            return res.json({token})
        //для ошибок действий пользователя для которых нужна авторизация
    }

}



module.exports = new AdminController()