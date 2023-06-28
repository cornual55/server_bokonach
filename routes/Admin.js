const Router = require('express')
const router = new Router()
const AdminContr = require('../controlles/AdminContr')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/reg', AdminContr.Registr)
router.post('/login', AdminContr.login)
router.get('/auth', authMiddleware, AdminContr.check)


module.exports = router