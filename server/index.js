require('dotenv').config()
const  express = require('express')
const  sequelize = require('./db')
const  models = require('./models/models')
const  cors = require('cors')//позволяет отправлять запросы через браузер к БД
const  fileUpload = require('express-fileupload')
const router = require('./routes/index')
const  errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const  path = require('path')

const  PORT = process.env.port||5000

const  app = express() //происходит запуск всего сайта
app.use(cors()) //подключили cors
app.use(express.json()) //позволяет парсить json
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({})) //позволяет работать с файлами
app.use('/api',router)

//всегда идет в самом конце
app.use(errorHandler)

//соединение с БД и сервером
const  start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log('Server started on port ${PORT}'))
    }catch (e) {
        console.log(e)
    }
}

start()