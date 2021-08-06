const Bid = require('../models/Bid')
const errorHandler = require('../utils/errorHadler')

module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id
    }

    //? Дата старта
    if (req.query.start) {
        query.date = {
            //Больше или равно
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    try {

        const orders = await Bid.find(query)
            .sort({ date: -1 })
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        res.status(200).json(orders)
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.getByIDBid = async function (req, res) {
    try { }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.deleteBid = async function (req, res) {
    try { }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Bid
            .findOne({ user: req.user.id })
            .sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const bid = await new Bid({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(bid)
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.update = async function (req, res) {
    try { }
    catch (err) {
        errorHandler(res, err)
    }
}