const uuid = require('uuid')
const path = require ('path')
const {Service, PHOTO} = require ('../models')
const ApiError = require('../error/ApiError')
class ServiceController {

    async create(req, res, next){
        try {
            const {title, text, price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const service = await Service.create({title, text,price, img : fileName})
            return res.json(service)
        } 
        catch (e) 
        {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAll(req, res){
      const service = await Service.findAll()
      return res.json(service)
  }
    async getOne(req, res) {
      try {
        const { id } = req.params;
        const service = await Service.findOne({ where: { id } });
        if (service) {
          return res.json(service);
        } else {
          return res.status(404).json({ error: 'Service not found' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch service' });
      }
    }
    
    async delete(req, res) {
        const { id } = req.body;
      
        try {
          // Предполагая, что у вас есть модель `PHOTO` определенная с использованием Sequelize
          const deletedService = await Service.destroy({ where: { id } });
      
          if (deletedService) {
            // Запись успешно удалена
            res.status(200).json({ message: 'Запись успешно удалена' });
          } else {
            // Запись с указанным идентификатором не найдена
            res.status(404).json({ error: 'Запись не найдена' });
          }
        } catch (error) {
          // Обработка ошибок при удалении записи
          console.error('Ошибка удаления записи:', error);
          res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
      }  
}

module.exports = new ServiceController()