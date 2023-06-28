const Router = require('express')
const router = new Router()
const admin = require('./Admin')
const news = require('./News')
const photo = require('./Photo')
const service = require('./Service')
const zayavki = require('./Zayavki')

router.use('/admin', admin)
router.use('/news', news)
router.use('/photo', photo)
router.use('/service', service)
router.use('/zayavki', zayavki)


module.exports = router
