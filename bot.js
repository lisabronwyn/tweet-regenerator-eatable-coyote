var Twit = require('twit')
var config = require('./config.js')

var Twitter = new Twit(config)

var database = require('./database.js')

// var retweet = () => {
//   var params = {
//     q: '#JavaScript30 OR #100DaysOfCode OR #javascriptforbeginners OR #codenewbie OR #juniorprogrammer OR #juniorwebdev OR #juniordev OR #learnersguild',
//     result_type: 'recent',
//     count: '10',
//     exclude_replies: 'true',
//     id_str: '14595769',
//     lang: 'en'
//   }
//
//   Twitter.get('search/tweets', params, (error, data) => {
//     if (error) {
//       console.log('something went wrong while searching')
//     } else {
//       var retweetId = data.statuses[0].id_str
//
//       Twitter.post('statuses/retweet/:id', {
//         id: retweetId
//       }, (error, response) => {
//         if (response) {
//           console.log('💛')
//         } else {
//           console.log(error + '\n' + 'Something wicked this way comes! 💀🐍! Or maybe just duplication.')
//         }
//       })
//     }
//   })
// }
// retweet()
// setInterval(retweet, 48000)
//
// var favorite = () => {
//   var fav_params = {
//     q: '#WordPress OR #juniordev or #womenintech',
//     result_type: 'recent',
//     lang: 'en'
//   }
//
//   var ranDom = (arr) => {
//     var index = Math.floor(Math.random()* arr.length)
//     return arr[index]
// }
//
//
//   Twitter.get('search/tweets', fav_params, (err, data) => {
//
//     var tweet = data.statuses
//     var randomTweet = ranDom(tweet)
//
//     if (typeof randomTweet != 'undefined') {
//       Twitter.post('favorites/create', {id: randomTweet.id_str}, (err, response) =>{
//         if (err) {
//           console.log('No favorite. ❌')
//         } else {
//           console.log('Liked: ❤️')
//         }
//       })
//     }
//   })
// }
//
// favorite()
// setInterval(favorite, 100000)

// 'use strict'
//
// const Twit = require('twit')
// var config = require('config.js')
// const T = new Twit(config)
// const database = require('database.js')

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
		const message = event.text
		database.addTweet(message)
		console.log('tweet added to database: ', message)
	}
	database.deleteDuplicates()
}
