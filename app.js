const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/Transactions'


const app = express()
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected......')
})

app.use(express.json())
const transactionRouter = require('./routes/transactions')
app.use('/transactions', transactionRouter)

app.listen(9000, () => {
    console.log('Server has started')
})