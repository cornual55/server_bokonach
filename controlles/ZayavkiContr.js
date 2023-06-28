const uuid = require('uuid')
const path = require ('path')
const {Zayavki} = require ('../models')
const ApiError = require('../error/ApiError')

class ZayavkiController {

    async create(req, res, next){
        try {
            const {FIO, Tel,email,id_service} = req.body

            const zayavki = await Zayavki.create({FIO, Tel,email,id_service})
            return res.json(zayavki)
        } 
        catch (e) 
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const zayavki = await Zayavki.findAll()
        return res.json(zayavki)
    }


}



module.exports = new ZayavkiController()