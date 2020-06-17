const mongoose = require('mongoose')
const transactionSchema = mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    senderName: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Transaction', transactionSchema)
