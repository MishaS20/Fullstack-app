const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRouts = require('./routes/auth')
const analyticshRouts = require('./routes/analytics')
const bidRouts = require('./routes/bid')
const categoryRouts = require('./routes/categorys')
const positionsRouts = require('./routes/positions')
const keys = require('./config/keys')
//?Создаём приложение
const app = express()

//?Подключаемся к бд
mongoose.connect(keys.MONGOYRI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.log(error))

//? Инициализирует Passport.
app.use(passport.initialize())
app.use('/uploads', express.static('uploads'))
require('./middleware/passport')(passport)
//? Morgan: это промежуточное программное обеспечение регистратора запросов HTTP(утилита)
app.use(require('morgan')('dev'))
//? анализирует текст в виде URL-кодированных данных и в req.body. extended: true указывает, что объект req.body будет содержать значения любого типа, а не только строки
app.use(bodyParser.urlencoded({ extended: true }))
//? просматривает запросыContent-Type: application/json , и преобразует текстовый ввод JSON в переменные, доступные для JS в разделе req.body
app.use(bodyParser.json())
//? Если клиент находится на другом домене,то мы всё равно сможем отвечать нашим сервером(утилита)
app.use(require('cors')())

app.use('/api/auth', authRouts)
app.use('/api/analytics', analyticshRouts)
app.use('/api/bid', bidRouts)
app.use('/api/category', categoryRouts)
app.use('/api/position', positionsRouts)

module.exports = app