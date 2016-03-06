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

   $scope.channels = [];
   var channels = [];
    angular.forEach(ExisistingChannels, function(channelName){
   var channel = {
     status : "Currently offline",
     name : channelName,
     link : "",
     logo : ""
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
    } 
    channels.push(channel);
    });
  });

  $scope.channels = channels;



}


