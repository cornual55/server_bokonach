const Router = require('express')
const router = new Router()
const NewsContr = require('../controlles/NewsContr')
const checkRole = require('../middleware/checkMiddleware') 

router.post('/', NewsContr.create)
router.get('/',  NewsContr.getAll)
router.get('/:id', NewsContr.getOne)
router.delete('/',  NewsContr.delete)
router.post('/up',  NewsContr.update)

module.exports = router