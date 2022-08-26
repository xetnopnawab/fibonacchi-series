var express = require('express');
var router = express.Router();

var userModel = require('./users');
var passport = require('passport');

var localstrategy = require('passport-local');

passport.use(new localstrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', (req,res)=>{
  const userI = new userModel({
    name: req.body.name,
    username: req.body.username
  });
  userModel.register(userI, req.body.password)
  .then(function(userCreated){
    passport.authenticate('local')(req,res, function(){
      res.send(userCreated);
    })
  })
})
function isli(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
    res.redirect('/');
  
}
router.get('/profile', isli,(req,res)=>{
  res.render('profile');
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect:'/'
}),(req,res)=>{})

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})


module.exports = router;
