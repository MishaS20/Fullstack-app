const Positions = require('../models/Positions')
const errorHandler = require('../utils/errorHadler')

module.exports.getByCategoryId = async function (req, res) {
    try {
        const postions = await Positions.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(postions)
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new Positions({
            title: req.body.title,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.delete = async function (req, res) {
    try {
        await Positions.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Позиция удалена'
        })
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.update = async function (req, res) {
    try {
        const position = Positions.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(position)
    }
    catch (err) {
        errorHandler(res, err)
    }
}