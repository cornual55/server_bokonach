const uuid = require('uuid')
const path = require ('path')
const {PHOTO} = require ('../models')
const ApiError = require('../error/ApiError')

class PhotoController {

    async create(req, res, next) {
        try {
           
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    

            const photo = await PHOTO.create({img : fileName})
            
            return res.json(photo)

        } catch (e) 
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const photo = await PHOTO.findAll()
        return res.json(photo)
    }
    
    
    async delete(req, res) {
        const { id } = req.body;
      
        try {
          // Предполагая, что у вас есть модель `PHOTO` определенная с использованием Sequelize
          const deletedPhoto = await PHOTO.destroy({ where: { id } });
      
          if (deletedPhoto) {
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



module.exports = new PhotoController()