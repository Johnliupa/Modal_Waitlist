const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash');
var user = require('./models/userModel')
var app = express();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const port = 3000;
app.set('view engine', 'ejs');

// var mongo = "mongodb://localhost:27017/waitlist";
// const db = mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true }, function(err){
//     if(err){
//         console.log(err);
//     }
// });
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(flash());


app.get('/', function(req, res) {
    res.render('waitlist');
});

app.get('/success', function(req, res) {
    res.render('success');
})

app.post('/signup', function(req, res) {
    console.log(req.body.email)
    const csvWriter = createCsvWriter({
    path: 'email.csv',
    header: [
        {id: 'email', title: 'Name'},
    ]
    });
    const data = [{email: req.body.email}]
    csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
    // user.create({
    //     email : req.body.email
    // }, 
    // function(err, data) {
    //     if(err){
    //         res.send(err)
    //     } else {
    //         // res.redirect('/success');
    //         res.redirect('https://www.facebook.com/jonthan.chen');
    //     }
    // })
})

app.listen(process.env.PORT || 5000)