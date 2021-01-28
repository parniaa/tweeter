/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//THE Limit is set to 140 + (5 char for the text value)
const TWEET_CHAR_LIMIT = 145;
$(document).ready(function() {

  const createTweetElement = function(tweet) {
    /* creating the tweet element */
    let date = new Date(tweet.created_at);
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
        <label id="date-item" >${date}</label>
        <div id="awsome-item">
          <span class="fa fa-flag"></span> 
          <span class="fa fa-retweet"></span> 
          <span class="fa fa-heart"></span> 
        </div>
      </footer>
    </article> `
    return $tweet;
  };

  const renderTweets = function(tweets) {
  // calls createTweetElement for each tweet
  // createTweetElement(tweet);
  // takes return value and appends it to the tweets container

    tweets.forEach(tweet => {
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
  };
  const loadTweets = function () {
    const url = `http://localhost:8080/tweets`;
    $.ajax({
      url,
      method: 'GET'
    })
      .done((result) => {
        // success case. getting the result of the api
        // this is the only block where you can access the result
        if(result ==='') {console.log("result empty")};
        $('#tweet-container').empty();
        renderTweets(result);
      })
      .fail(() =>
        console.log('There was an error getting the info for that show')
      )
      .always(() => console.log('Request is completed.'));
    
  };
 
  loadTweets();
  $('.c1').on('submit', function (event) {
    // prevent the default form submission
    event.preventDefault();
    const submitTweet = $(this).serialize();
    if(submitTweet.length < TWEET_CHAR_LIMIT) {
      $('#errorstyle1').slideUp();
      $('#errorstyle2').slideUp();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: submitTweet
      })
        .done((data) => {
          
          loadTweets();
        })
        .fail(() => {
          if (submitTweet === `text=`) {
            $('#errorstyle1').slideUp();
            $('#errorstyle2').slideDown();
          }
          console.log('There was an error getting the info for that show', submitTweet);
        
        })
        .always(() => console.log('Request is completed.'));
    } else {
      $('#errorstyle2').slideUp();
      $('#errorstyle1').slideDown();
    }
      
  });

});

