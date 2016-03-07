angular.module('TwitchStatus', [])
.controller('TwitchCtrl', TwitchCtrl);

function TwitchCtrl ($scope, $q, $http) 
{
  var ExisistingChannels = [
    "freecodecamp", 
    "storbeck",
    "terakilobyte", 
    "habathcx",
    "RobotCaleb",
    "thomasballinger",
    "noobs2ninjas",
    "beohoff"
  ];

  var count = {
    all: ExisistingChannels.length,
    online: 0,
    offline: 0
  };

   $scope.channels = [];
   var channels = [];
    angular.forEach(ExisistingChannels, function(channelName){
   var channel = {
     name : channelName,
     link : "",
   };

   //var streamsCall =  $http.jsonp('https://api.twitch.tv/kraken/streams/'+channelName+'?callback=JSON_CALLBACK');
   //asynch calls
    $http.jsonp('https://api.twitch.tv/kraken/channels/'+channelName+'?callback=JSON_CALLBACK').then(function(results) { 
    var data = results.data;
    channel.name = data.display_name;
    channel.logo = data.logo;
    channel.link = data.url;
    channel.status = data.status;
    channel.statusClass = "label label-success";
    channel.statusType = "Online";
    if(channel.status === null)
    {
      channel.status = "Currently offline"; 
      channel.statusClass = "label label-danger"; 
      channel.statusType = "Offline";
      count.offline++;
    } else {
      count.online++;
    }

    if(channel.logo === null) {
      channel.logo = "https://farm2.staticflickr.com/1509/24968993283_5d084ca703_o.jpg";//unknown image
    }
    channels.push(channel);
    });
  });

  $scope.channels = channels;
  $scope.count = count;



}


