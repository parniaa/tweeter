/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData =
[
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1611551304911
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611637704911
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611637704911
  },
  {
    "user": {
      "name": "Armin",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611637704911
  }
  
];



// // const $tweet = createTweetElement(tweetData);
// const $tweet = $(`<article class="tweet">Hello world</article>`);


const createTweetElement = function(tweet) {
  /* creating the tweet element */
  let $tweet = `
  <article id="tweet-main">
    <header id="tweet-profile">
      <img  id="tweet-image" src=${tweet.user.avatars}> 
      <label id="tweet-id">${tweet.user.name}</label>
    </header>
    <div id="tweet-body"> 
    ${tweet.content.text}
    </div>
    <footer id ="footer-container">
      <label id="date-item" >${tweet.created_at}</label>
      <div id="awsome-item">
        <span class="fa fa-flag"></span> 
        <span class="fa fa-retweet"></span> 
        <span class="fa fa-heart"></span> 
      </div>
    </footer>
  </article> `
  return $tweet;
};

// Test / driver code (temporary)
// console.log(createTweetElement(tweetData)); // to see what it looks like



const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(tweet => {
    // calls createTweetElement for each tweet
    // createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(document).ready(function() {
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
  });
  

};

renderTweets(tweetData);