const express = require('express')
const bodyParser = require('body-parser')
// const Twitter = require('twitter')
const session = require('express-session')
// const cors = require('cors')
const config = require('./config.js')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy


const app = express()

const port = config.port

app.use(express.static(__dirname + '/public'))

app.use(bodyParser())

// app.use(cors({
//   origin: [`http://localhost:${port}`, 'http://127.0.0.1:8080'],
//   credentials: true
// }))

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}))

passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_CONSUMER_KEY,
    consumerSecret: config.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:5117/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// var client = new Twitter({
//   consumer_key: config.TWITTER_CONSUMER_KEY,
//   consumer_secret: config.TWITTER_CONSUMER_SECRET,
//   access_token_key: config.TWITTER_TOKEN_KEY,
//   access_token_secret: config.TWITTER_TOKEN_SECRET
// });
//
// var params = {screen_name: 'nodejs'};
//
// client.get('statuses/user_timeline', params, (error, tweets, response) => {
//   if (!error) {
    // console.log(tweets);
//   }
// });

// var stream = client.stream('statuses/filter', {track: 'webdev'});
// var stream = client.stream('statuses/user_timeline');

// stream.on('data', (event) => {
//   console.log(event && event.text);
//
// });
//
// stream.on('error', (error) => {
//   throw error;
// });



app.listen(port, ()=>{
  console.log(`peep me on port ${port}`);
})
