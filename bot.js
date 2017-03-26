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
