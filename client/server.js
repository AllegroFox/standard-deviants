const express = require('express');
const app = express();


// ############################
// # Passport Authentication: #
// ############################


const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.get("/login", (req, res) => {
  // let templateVars = { urls: urlDatabase, user_id: users[req.session.user_id] };
  res.render("login");
})


app.post('/login',
  passport.authenticate('local', { successRedirect: '/game',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
