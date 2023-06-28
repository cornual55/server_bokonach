const Router = require('express')
const router = new Router()
const ZayavkiContr = require('../controlles/ZayavkiContr')
const checkRole = require('../middleware/checkMiddleware') 

router.post('/', ZayavkiContr.create)
router.get('/',  ZayavkiContr.getAll)

module.exports = router