require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5050
const app = express()
const models = require('./models')
const cors = require('cors')
const { code } = require('statuses')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require ('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',router)


//Обработка ошибок, последний Мидлвер
app.use(errorHandler)


const start = async () => {
    try {
            await sequelize.authenticate()
            await sequelize.sync()
            app.listen(PORT,  () =>  console.log('Server  started on port', PORT))
    } catch (e){
        console.log(e)
    }

}

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

start()
