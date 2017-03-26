var express = require('express');
var config = require('../config.js');
var twit = require('twit');
var Twitter = new twit(config);
var database = require('../database.js');


var router = express.Router();


function getAll() {
	database.getAllTweets().then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetext)
		}
		database.deleteDuplicates()
	})
}

function getOne() {
	getAll()
	var arrayLength = allTweets.length
	var index = Math.floor((Math.random() * arrayLength) + 1);
	return allTweets[index]
}

var params = {
  screen_name: 'lisabronwyn',
  q: 'lisabronwyn',
  count: 10
}

Twitter.get('search/tweets', params, getTweets)

function getTweets(err, data, response) {
  var tweets = data.statuses
  for(var i=0; i < tweets.length; i++) {
    database.addTweet(tweets[i].text)
  }
}

router.get('/', function(request, response, next) {
  database.getAllTweets()
  .then(function(data) {
    response.render('index', {
      title: 'Lisa Bronwyn\'s Tweets',
      tweets: data
    });
  })
});

setInterval (tweetOut, 9000*600)

function tweetOut() {
	var allTweets = [];
	database.getAllTweets()
	.then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetext)
		}
		var arrayLength = allTweets.length
		var index = Math.floor((Math.random() * arrayLength) + 1);
		console.log('index: ', index) //console.log here is intentionally left in!
		var tweet = {
			status: allTweets[index]
		}

		Twitter.post('statuses/update', tweet, tweeted)

		function tweeted(err, data, respoonse) {
			if(err) {
				console.log('Something went wrong!', err)
			} else {
				console.log('It worked!')
			}
		}
	})
}

module.exports = router;
