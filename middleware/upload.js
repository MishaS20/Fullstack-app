//?Данный пакет позваляет делать загрузку файлов
const multer = require('multer')
//?Данный пакет позваляет проще работать с различными данными
const moment = require('moment')

//?Конфигурем то,как файлы будут храниться и загружаться
const storage = multer.diskStorage({
    //? определяет место для сохранения загруженных файлов - в данном случае папка "uploads"
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    //? определяет имя для загруженных файлов
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

//? Ограничения размера файла
const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})