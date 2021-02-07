/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//THE Limit is set to 140 + (5 char for the text value)

const timeDifference = function (current, previous) {

  const MS_PER_MINUTE = 60 * 1000;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;
  const MS_PER_MONTH = MS_PER_DAY * 30;
  const MS_PER_YEAR = MS_PER_DAY * 365;

  let elapsed = current - previous;

  if (elapsed < MS_PER_MINUTE) {
    return Math.round(elapsed/1000) + ' seconds ago';   
  } else if (elapsed < MS_PER_HOUR) {
    return Math.round(elapsed/MS_PER_MINUTE) + ' minutes ago';   
  } else if (elapsed < MS_PER_DAY ) {
    return Math.round(elapsed/MS_PER_HOUR ) + ' hours ago';   
  } else if (elapsed < MS_PER_MONTH) {
    return   Math.round(elapsed/MS_PER_DAY) + ' days ago';   
  } else if (elapsed < MS_PER_YEAR) {
    return  Math.round(elapsed/MS_PER_MONTH) + ' months ago';   
  } else {
    return  Math.round(elapsed/MS_PER_YEAR ) + ' years ago';   
  }
};
const TWEET_CHAR_LIMIT = 145;
$(document).ready(function() {

  const createTweetElement = function(tweet) {
    /* creating the tweet element */
    let date = new Date(tweet.created_at);
    let currentDate = new Date();
    let relativeDate = timeDifference(currentDate, date);
    let $tweet = ` 
    <article id="tweet-main">
      <header id="tweet-profile">
        <div id="tweet-c">
          <img  id="tweet-image" src=${tweet.user.avatars}> 
          <label id="tweet-id">${tweet.user.name}</label>
        </div>
        <label id="tweet-handle">${tweet.user.handle}</label>
      </header>
      <div id="tweet-body"> 
      ${tweet.content.text}
      </div>
      <footer id ="footer-container">
        <label id="date-item" >${relativeDate}</label>
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
        $('#tweet-container').empty();
        $(".i3i2").val('140');
        renderTweets(result);
      });

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
          $('.i2').val('');
          
        })
        .fail(() => {
          if (submitTweet === `text=`) {
            $('#errorstyle1').slideUp();
            $('#errorstyle2').slideDown();
          }
        });
    } else {
      $('#errorstyle2').slideUp();
      $('#errorstyle1').slideDown();
    }
  });

});

