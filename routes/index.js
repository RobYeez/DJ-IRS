var express = require('express');
var router = express.Router();

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var Schema = mongoose.Schema;

//set up the format of how information is inserted
//*** can lookup how things are set up ex. email/username */
//TEST
var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String},
  author: {type: String}
}, { collection: 'user-data'}); //names it user-data
// var userDataSchema = new Schema({
//   first_name: {type: String, required: true},
//   last_name: {type: String, required: true},
//   email: {type: String, required: true}
// }, { collection: 'user-data'}); //names it user-data

//create actual model of setup
var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
//rendering to index file or (/ = same folder)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

//Registration routing
router.get('/registration', function(req, res, next) {
  //res.render = file for html
  res.render('registration', { title: 'Registration', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
});

//check validity for registration
router.post('/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  
  var errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    req.session.success = false;
  }
  else {
    req.session.success = true;
  }
  res.redirect('/registration');
});
 
//login routing
router.get('/login', function(req, res, next) {
  //res.render = file for html
  res.render('login', { title: 'login', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
});

//login validation
router.post('/submitLogin', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  // req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  
  var errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    req.session.success = false;
  }
  else {
    req.session.success = true;
  }
  res.redirect('/');
});

//mongoose routing
router.get('/get-data', function(req, res, next) {
  UserData.find()
    .then(function(doc) {
      res.render('index', {title: "Test Mongoose", items: doc});
    });
  // res.redirect('/testDB'); //figure out this part 
})

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
 
  var data = new UserData(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    //error handling
    if (err) {
      console.log('Error!!!, no entry found!');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  });
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

//get and post request
//https://www.youtube.com/watch?v=Sb8xyCa2p7A
//localhost/user/detail ^ basically a subroute
 

module.exports = router;
