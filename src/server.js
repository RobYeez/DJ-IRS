var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongdb://localhost:27017/dj-irs'

mongoose
    .connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})