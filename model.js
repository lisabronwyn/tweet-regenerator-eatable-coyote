'use strict'

const Twit = require('twit')
const config = require('/.config.js')
const T = new Twit(config)
const database = require('/.database.js')

function getAll() {
	database.getAllTweets().then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetx)
		}
		database.deleteDuplicates()
	})
}

function getOne() {
	getAll()
	const arrayLength = allTweets.length
	const index = Math.floor((Math.random() * arrayLength) + 1);
	return allTweets[index]
}

//GET OLD TWEETS IN BATCHES FROM TWITTER
const params = {
	screen_name:'lisabronwyn',
	q: 'lisabronwyn',
	count: 10
}

T.get('search/tweets', params, getTweets)

function getTweets(err, data, response) {
	var tweets = data.statuses
	for(var i = 0; i < tweets.length; i++) {
		// let test = tweets[i].text
		database.addTweet(tweets[i].text)
	}
}

//	TWEET OUT ONE RANDOM TWEET FROM DB
setInterval (tweetOut, 1000*60)

function tweetOut() {
	const allTweets = [];
	database.getAllTweets()
	.then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetx)
		}
		let arrayLength = allTweets.length
		let index = Math.floor((Math.random() * arrayLength) + 1);
		console.log('index: ', index) //console.log here is intentionally left in!
		let tweet = {
			status: allTweets[index]
		}

		T.post('statuses/update', tweet, tweeted)

		function tweeted(err, data, respoonse) {
			if(err) {
				console.log('Something went wrong!', err)
			} else {
				console.log('It worked!')
			}
		}
	})
}

//ADD TWEETS TO DATABASE AS TWEETED
var stream = T.stream('user')
stream.on('tweet', addToDb)

function addToDb(event) {
	if(event.user.screen_name === 'lisabronwyn') {
		var const message = event.text
		database.addTweet(message)
		console.log('tweet added to database: ', message)
	}
	database.deleteDuplicates()
}
