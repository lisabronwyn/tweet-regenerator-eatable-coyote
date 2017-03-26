var databaseName = 'twitterbot';
var connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`;

var pgp = require('pg-promise')();
var database = pgp(connectionString);

var getAllTweets = function() {
  return database.any('SELECT * FROM tweets ORDER BY tweetx');
};

var addTweet = function(tweetx) {
  database.any(
    `INSERT INTO tweets (tweetx)
    VALUES ($1)`, (tweetx)
  )
}

module.exports = {
  addTweet,
  getAllTweets
}
