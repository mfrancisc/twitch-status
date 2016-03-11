angular.module('TwitchStatus', [])
.controller('TwitchCtrl', TwitchCtrl)
.service('TwitchApiCall', TwitchApiCall);

function TwitchApiCall($http){

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
  var channels = [];
  angular.forEach(ExisistingChannels, function(channelName){
    //var streamsCall =  $http.jsonp('https://api.twitch.tv/kraken/streams/'+channelName+'?callback=JSON_CALLBACK');
    //asynch calls
    $http.jsonp('https://api.twitch.tv/kraken/channels/'+channelName+'?callback=JSON_CALLBACK').then(function(results) { 
      var data = results.data;
    var channel = data;
    channel.name = data.display_name;
    channel.logo = data.logo;
    channel.link = data.url;
    channel.status = data.status;
    channel.statusClass = "label label-success";
    channel.statusType = "Online";
    channel.video_banner = data.video_banner;
    channel.followers = data.followers;
    channel.views = data.views;
    channel.created_at = data.created_at.substring(0, 10);

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

    if(channel.video_banner === null){
      channel.video_banner =  'https://unsplash.it/500/400/?random';
    }

    channels.push(channel);

  });
  });

  var data = {
    'channels': channels, 
    'count': count
  };

  return {
        getChannelsData: function() {
            return data;
        }
  };
}

function TwitchCtrl ($scope, $http, filterFilter, TwitchApiCall) {

   $scope.channels = [];
   var data = TwitchApiCall.getChannelsData();
   $scope.channels = data.channels;
   $scope.count = data.count;
  // all
  $scope.allFilter = function(){
   var data = TwitchApiCall.getChannelsData();
   $scope.channels = data.channels;
   $scope.count = data.count;
  };

  // online
  $scope.onlineFilter = function(){
   var data = TwitchApiCall.getChannelsData();
   $scope.channels = data.channels;
   $scope.count = data.count;
  $scope.channels = filterFilter($scope.channels,{statusType:'Online'}); 
  };
  
  // offline
  $scope.offlineFilter = function(){
   var data = TwitchApiCall.getChannelsData();
   $scope.channels = data.channels;
   $scope.count = data.count;
    $scope.channels = filterFilter($scope.channels,{statusType:'Offline'}); 
  };

}
