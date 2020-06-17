const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

//#region GetAllTransactions GET
router.get('/GetAllTransactions', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.json(transactions)
    }
    catch (err) {
        require.send('Error: ' + err)
    }
})
//#endregion

//#region CreateTransaction POST
router.post('/CreateTransaction', async (req, res) => {
    const transact = new Transaction({
        amount: req.body.amount,
        transactionDate: Date.now(),
        senderName: req.body.senderName
    })
    const store = await transact.save((err, success) => {
        res.send(store)
        if (err) {

            res.status(500).json({

                status: "fail",

                message: "Error establishing database connection"

            });

        } else if (success) {

            res.status(200).json({

                status:"Successfull",
                 message:transact.senderName + " Successfully created"
            });
        }
        else {

            res.status(503).json({

                status: "title or body cannot be empty"
            })
        }
    })

})
//#endregion

//#region GetTransactionById GET
router.get('/GetTransaction/:id', async (req, res) => {

    
    try{
        const transaction = await Transaction.findById(req.params.id)
        res.send(transaction)
    }
    catch(err){
    res.send("Error "+err)}
})
//#endregion

//#region UpdateTransaction PATCH
router.patch('/UpdateTransaction/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
    transaction.senderName = req.body.senderName
    transaction.transactionDate = Date.now()
    transaction.amount = req.body.amount
    const store = await transaction.save((req.params.id, (err) => {
       
        if (err) {

            res.status(500).json({

                status: "fail",

                message: "Error establishing database connection"
            })

        } else if (!err) {

            res.status(200).json({

                status:"Successfully updated"
            })

        }
        else {

            res.status(503).json({

                status: "title or body cannot be empty"

            })
        }
    })
    )

})
//#endregion

//#region DeleteTransaction DELETE
router.delete('/DeleteTransaction/:id', async (req, res) => {

    const transaction = await Transaction.findByIdAndRemove(req.params.id, (err) => {

        if (!err) {

            res.status(200).json({

                status: "Transaction has been deleted successfully"

            });

        }
        else {

            res.status(503).json({
                status: "No database connection established"

            })

        }

    })
})
//#endregion
module.exports = router
