const Router = require('express')
const router = new Router()
const PhotoContr = require('../controlles/PhotoContr')
const checkRole = require('../middleware/checkMiddleware') 

router.post('/', PhotoContr.create)
router.get('/',  PhotoContr.getAll)
router.delete('/',PhotoContr.delete)

module.exports = router