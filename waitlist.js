const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash');
var user = require('./models/userModel')
var app = express();
const port = 3000;
app.set('view engine', 'ejs');

var mongo = "mongodb://localhost:27017/waitlist";
const db = mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true }, function(err){
    if(err){
        console.log(err);
    }
});
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

app.post('/signup', async function(req, res) {
    user.create({
        email : req.body.email
    }, 
    function(err, data) {
        if(err){
            res.send(err)
        } else {
            // res.redirect('/success');
            res.redirect('https://www.facebook.com/jonthan.chen');
        }
    })
})

app.listen(port, () => {
})