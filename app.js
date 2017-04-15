var app = angular.module('app', []);

/**********************************************************************************                                                              *
 * Use of an external JSON API to search for movies and series.                   *
 *********************************************************************************/

/**
 * OMDb API: http://www.omdbapi.com/
 */
app.provider('OMDbApi', function OMDbApiProvider() {
  var endpoint = 'http://www.omdbapi.com/';
  var baseIMDbUrl = 'http://www.imdb.com/title/';
  var searchByMovieName = '?s=';
  
  this.$get = ['$http', function OMDbApiFactory($http) {
      return {
        // function that will call the OMDb API and return the list of movies corresponding to the keywords.
        searchMovies: function(keywords){
           return $http.get("http://www.omdbapi.com/?s="+keywords);          
        }
      };
  }];
});

/**
 * Movie Controller
 */
app.controller('MovieController', ['$scope','$http', 'OMDbApi',
  function ($scope, $http, OMDbApi)
  {
    $scope.sortReverse = false;
    // This function will retrieve all movies names based on user entered keyword
    $scope.searchMovieName = function() {
      if(undefined !== $scope.search && $scope.search.length > 0){
      OMDbApi.searchMovies($scope.search).then(  
        function(response){
          if(response.data.Response === "True"){
            $scope.movies =  response.data.Search;
            $scope.showError = false;
            console.log($scope.movies);
          }else{
            $scope.showError = true;
            $scope.movies = [];
          }
          
        }
      );
    }
    }
}]);
