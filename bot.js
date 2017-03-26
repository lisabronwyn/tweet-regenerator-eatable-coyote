var Twit = require('twit')
var config = require('./config.js')

var Twitter = new Twit(config)

var database = require('./database.js')

var retweet = () => {
    var params = {
        q: '#JavaScript30 OR #javascriptforbeginners OR #juniorprogrammer OR #juniorwebdev OR #juniordev OR #learnersguild',
        result_type: 'recent',
        count: '10',
        exclude_replies: 'true',
        id_str: '14595769',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, (error, data) => {
        if (error) {
            console.log('something went wrong while searching')
        } else {
            var retweetId = data.statuses[0].id_str

            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, (error, response) => {
                if (response) {
                    console.log('💛')
                } else {
                    console.log(error + '\n' + 'Something wicked this way comes! 💀🐍! Or maybe just duplication.')
                }
            })
        }
    })
}
retweet()
setInterval(retweet, 31000)

console.log('The bot is starting!');

var router = require('routes-js').create();

router.route('/', function(req) {
  console.log('home page');
  document.body.innerHTML = '<h1>Home</h1><a href="/users">Users</a>';
});

router.route('/users', function(req) {
  console.log('users page');
  document.body.innerHTML = '<h1>Users</h1><a href="/users/42">User 42</a>';
});

router.route('/users/:lisabronwyn', function(req) {
  console.log('a user page');
  document.body.innerHTML = '<h1>User ' + req.params.userId + '</h1><a href="/">Home</a>';
});

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

var params = {
  q: 'instagram since: 2011-11-11',
  user_id: '14595769',
  count: 100
};

T.get('search/tweets', params, gotData);

function gotData (err, data, response) {
  console.log(data)
}
