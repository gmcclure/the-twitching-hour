(function($, window, document, undefined) {
  'use strict';

  $('.nav-tabs a').on('click', function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", 
                   "RobotCaleb", "comster404", "brunofin", "thomasballinger", 
                   "noobs2ninjas", "beohoff", "MedryBW"];

  streamers.forEach(function(streamer) {
    $.getJSON(
      'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?',
      function(data) {
        
        var logoUrl = '';
        $.getJSON(
          'https://api.twitch.tv/kraken/users/' + streamer + '?callback=?',
          function(userData) {
            logoUrl = userData.logo;

            var streamingCls = 'not-streaming', streamingGame = '';
            if (data.error === 'Unprocessable Entity') {
              streamingCls = 'no-acct';
            }
            else if (data.stream !== null) {
              streamingCls = 'streaming';
              streamingGame = data.stream.game;
            }

            var streamerItem =
              '<li class=' + streamingCls + '>' + 
              '<div class="stream-logo"><img src="' + logoUrl + '"/>' + 
              '</div><a target = "_blank" href="http://twitch.tv/' + streamer + '">' + 
              '<span class="name">' + streamer + '</span>' + 
              '</a><div class="stream-data">' + streamingGame + '</div></li>';

            $('#all ul').append(streamerItem);

            if (data.stream !== null && data.error !== 'Unprocessable Entity') {
              $('#online ul').append(streamerItem);
            } else {
              $('#offline ul').append(streamerItem);
            }
          }
        )
      });
  });

  $('.search').on('input', function() {
    var filter = $(this).val();
    if (filter) {
      $('.tab-pane ul').find('a:not(:contains(' + filter + '))').parent().slideUp();
      $('.tab-pane ul').find('a:contains(' + filter + ')').parent().slideDown();
    } else {
      $('.tab-pane ul').find('li').slideDown();
    }
  });

})($, window, document);
