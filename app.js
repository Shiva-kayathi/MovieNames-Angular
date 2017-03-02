var app = angular.module('app', []);

/**********************************************************************************
 * Exercise 2                                                                     *
 * Use of an external JSON API to search for movies and series.                   *
 *********************************************************************************/

/**
 * OMDb API: http://www.omdbapi.com/
 * 
 * TODO: Complete the service to call the OMDb API:
 * - Do a searchMovies(keywords) function that will call the OMDb API and return
 *   the list of movies corresponding to the keywords.
 *
 * Some remarks:
 * - Minimize the number of API calls when it's possible (cache results, etc.).
 * - No need to use external modules, angular services are enough: $http, $q, etc.
 * - Don't hesitate to use console.log() for the received movies to see how is formated the JSON
 *   and the different movies attributes that you can use.
 */
  app.provider('OMDbApi', function OMDbApiProvider() {
    var endpoint = 'http://www.omdbapi.com/';
    var baseIMDbUrl = 'http://www.imdb.com/title/';
    var searchByMovieName = '?s=';
    this.$get = ['$http', function OMDbApiFactory($http) {
        return {
          // TODO
          searchMovies: function(keywords){
             return $http.get("http://www.omdbapi.com/?s="+keywords);          
          }
        };
    }];
  });

/**
 * Movie Controller
 *
 * TODO: Handle the search field and display the result
 * - You can choose how to trigger the display of the result (click on a button, timeout, etc.).
 * - Display a message if there is no result.
 * - Each line of result have to be clickable to redirect to the imdb.com movie page.
 *
 * Bonus:
 * - Allow to be able to sort the movies by release date (and change the sorting by a button)
 * - Display movies with a different color than series
 */
app.controller('MovieController', ['$scope','$http', 'OMDbApi',
  function ($scope, $http, OMDbApi)
  {
    // TODO
    $scope.searchMovieName = function() {
      OMDbApi.searchMovies($scope.search).then(  
        function(response){
          $scope.movies =  response.data.Search;
        }
      );
    }
}]);
