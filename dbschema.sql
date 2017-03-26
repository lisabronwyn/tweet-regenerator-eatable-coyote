DROP DATABASE IF EXISTS twitterbot;
CREATE DATABASE twitterbot;

\c twitterbot

DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets
  (
    tweetid SERIAL PRIMARY KEY,
    tweetx VARCHAR(1720)
  );

  INSERT INTO tweets(tweetx)
  VALUES('I am so eating sushi!')
