require('dotenv').config()
const express = require('express')
const app = express()
const passport = require('passport');
const cookieSession = require('cookie-session')      // cookie session 
require('./passport.js');


// //  cookie session middleware // from document 
 app.use(cookieSession({
    name: 'check-seesion',
     keys: ['key1', 'key2']
   }))

app.set('view engine','ejs')

//  middleware to checks if the user is logged in
const userLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(404);
    }
}

//  passport and passport sessions are intilized here and these are middlewere functions
app.use(passport.initialize());
app.use(passport.session());

// protected and unprotected routes
app.get('/', (req, res) => res.render('pages/index'))


app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// // In this route you can see that if the user is logged in and we can  acess his info in: (req.user)
 app.get('/happy', userLoggedIn, (req, res) =>{
    res.render("pages/main",{name:req.user.displayName,email:req.user.emails[0].value})
 })

 
 // passport.authenticate is middleware function which will execute here///its like middleware
 // /google request is made then this authenticate function will execute just before the request is made
 // also taking third argument scope means what information we want to see.
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));    // authentication function with scope(which we want to see)
                                                                                      

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),        //executing middleware function                                                              
  function(req, res) {
    // Successful authentication
    res.redirect('/happy');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(8080, () => console.log(`Server listening on port ${8080}!`))

