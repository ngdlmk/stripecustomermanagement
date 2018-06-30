const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const app = express()
var stripe = require("stripe")(
    "sk_test_QSEqZNjucQ7CbFcvbABS9uAY"
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/addcustomer', (req, res) => {
    stripe.customers.create({
        description: req.body.description,
        source: "tok_visa", // obtained with Stripe.js
        account_balance: req.body.balance,
        email: req.body.email,
        metadata: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
      }, (err, customer) => {
        if(err)
            res.send({error: "there is an error"})
        else
            res.send({id: customer.id})
      });
})

app.post('/listcustomers', (req, res) => {
    stripe.customers.list(
        { limit: 100 },
        (err, customers) => {
            if(err) 
                res.send({error: 'there is an error'})
            else
                res.send(customers)
        }
    );
})

app.post('/updatecustomer', (req, res) => {
    stripe.customers.update(req.body.customerID, {
        description: req.body.description,
        account_balance: req.body.balance,
        email: req.body.email,
        metadata: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    }, (err, customer) => {
        if(err)
            res.send({error: 'there is an error'})
        else {
            res.send({success: 'yes'})
        }
    })
})

app.post('/deletecustomer', (req, res) => {
    stripe.customers.del(
        req.body.customerID, (err, confirmation) => {
            if(err)
                res.send({error: "there is an error"})
            else 
                res.send({confirmation})
            console.log(confirmation)
        }
    );
})

http.createServer(app).listen(9000) 