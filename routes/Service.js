const Router = require('express')
const router = new Router()
const ServiceContr = require('../controlles/ServiceContr')
const checkRole = require('../middleware/checkMiddleware') 

router.post('/', ServiceContr.create)
router.get('/',  ServiceContr.getAll)
router.get('/:id', ServiceContr.getOne)
router.delete('/',ServiceContr.delete)




module.exports = router