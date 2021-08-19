const moment = require('moment')
const Bid = require('../models/Bid')
const errorHandler = require('../utils/errorHadler')


module.exports.overview = async function (req, res) {
    try {

        const allBids = await Bid.find({ user: req.user.id }).sort({ date: 1 })
        const bidsMap = getBidsMap(allBids)
        const yesterdayBids = bidsMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        //Кол-во св вчера
        const yesterdayBidsNumber = yesterdayBids.length
        //Кол-во св
        const totalBidsNumber = allBids.length
        //Кол-во дней
        const daysNumber = Object.keys(bidsMap).length
        //Св в день
        const bidsPerDay = (totalBidsNumber / daysNumber).toFixed(0)
        //Процент от кол-ва св
        const bidsPercent = (((yesterdayBidsNumber / bidsPerDay) - 1) * 100).toFixed(2)
        //Общая прибыль
        const totalSumm = calculatePrice(allBids)
        //Прибыль в день
        const gainPerDay = totalSumm / daysNumber
        //Прибыль за вчера
        const yesterdayGain = calculatePrice(yesterdayBids)
        //Процент прибыли
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
        //Сравнение прибыли
        const compairGain = (yesterdayGain - gainPerDay).toFixed(2)
        //Сравнение кол-ва св
        const compairNumber = (yesterdayBidsNumber - bidsPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compair: Math.abs(+compairGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0,
            },
            bids: {
                percent: Math.abs(+bidsPercent),
                compair: Math.abs(+compairNumber),
                yesterday: +yesterdayBidsNumber,
                isHigher: +bidsPercent > 0,
            },
        })
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.analytics = async function (req, res) {
    try {
        const allBids = await Bid.find({ user: req.user.id }).sort({ date: 1 })
        const bidsMap = getBidsMap(allBids)

        const average = +(calculatePrice(allBids) / Object.keys(bidsMap).length).toFixed(2)
        const chart = Object.keys(bidsMap).map(
            label => {
                const gain = calculatePrice(bidsMap[label])
                const bid = bidsMap[label].length
                return { label, gain, bid }
            })

        res.status(200).json({ average, chart })
    }
    catch (err) {
        errorHandler(res, err)
    }
}

module.exports.effectiveBid = async function (req, res) {

}

function getBidsMap(bids = []) {
    const daysBids = {}
    bids.forEach(bid => {
        const date = moment(bid.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) { return }

        if (!daysBids[date]) { daysBids[date] = [] }

        daysBids[date].push(bid)
    })
    return daysBids
}

function calculatePrice(bids) {
    return bids.reduce((total, bid) => {
        const bidCost = bid.list.reduce((bidTotal, item) => {
            return bidTotal += item.win
        }, 0)
        return total += bidCost
    }, 0)
}