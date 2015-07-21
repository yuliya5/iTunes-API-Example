var app = angular.module('itunes');

app.service('itunesService', function($http, $q){ //<--itunesServices will also be injected into a controller (mainCtrl.js)
  
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    
  this.getArtist = function(artist){ //accepts the artist's name as the parameter

    var deferred = $q.defer();

      $http({
        method: 'JSONP', // <-- Looking through the API docs for iTunes
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      }).then(function(response){ // <-- I can make up this word like response, songs, whatever
        var res = response.data.results; 
        console.log(res) // <-- this helps me see what keys/properties are in iTune's API
        for (var i = 0; i < res.length; i++){ // <-- this loops through iTune's API
          res[i].AlbumArt = res[i].artworkUrl100; // <-- this is per the instructions of the main controller. 
          res[i].Artist = res[i].artistName;      // Basically think of it like this: Requested format = iTune's API format
          res[i].Collection = res[i].collectionName;
          res[i].CollectionPrice = res[i].collectionPrice;
          res[i].Play = res[i].previewUrl;
          res[i].Type = res[i].kind;
        }
        deferred.resolve(res) // <-- 'resolve' is given, this will promise and sends RAW DATA to the controller (so, all of my objects)
      })
      return deferred.promise;   
    }


});