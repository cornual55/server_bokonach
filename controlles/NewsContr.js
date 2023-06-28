const uuid = require('uuid')
const path = require ('path')
const {NEWS, PHOTO} = require ('../models')
const ApiError = require('../error/ApiError')

class NewsController {

    async create(req, res, next){
        try {
            const {title, text} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const news = await NEWS.create({title, text, img : fileName})
            return res.json(news)
        } 
        catch (e) 
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const news = await NEWS.findAll()
        return res.json(news)
    }

    async getOne(req, res) {
      try {
        const { id } = req.params;
        const news = await NEWS.findOne({ where: { id } });
        if (news) {
          return res.json(news);
        } else {
          return res.status(404).json({ error: 'News not found' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch news' });
      }
    }
        
    async delete(req, res) {
        const { id } = req.body;
      
        try {
          // Предполагая, что у вас есть модель `PHOTO` определенная с использованием Sequelize
          const deletedNEWS = await NEWS.destroy({ where: { id } });
      
          if (deletedNEWS) {
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

      async update(req, res, next) {
        try {
          const { id, title, text } = req.body;
          const { img } = req.files;
          let fileName = uuid.v4() + ".jpg";
          img.mv(path.resolve(__dirname, '..', 'static', fileName));
          
          const updatedNEWS = await NEWS.update(
            { title, text, img: fileName },
            { where: { id } }
          );
          
          if (updatedNEWS[0]) {
            // Объект успешно обновлен
            return res.json({ message: 'Объект успешно обновлен' });
          } else {
            // Объект с указанным идентификатором не найден
            return res.status(404).json({ error: 'Объект не найден' });
          }
        } catch (error) {
          // Обработка ошибок при обновлении объекта
          console.error('Ошибка обновления объекта:', error);
          next(ApiError.badRequest(error.message));
        }
      }
      
}



module.exports = new NewsController()
