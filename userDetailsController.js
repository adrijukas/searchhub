(function() {

  var controller = function($scope, github, $anchorScroll, $location, $routeParams) {

    var onUserComplete = function(data) {
      $scope.user = data;
      // when user response is returned, get the data from the URL
      // in the user.repos_url attribute
      github.getRepositories($scope.user).then(onReposComplete, onError);

      // reset the error
      $scope.error = null;
    };

    var onReposComplete = function(data) {
      $scope.repositories = data;

      // call location service to send the hash identifier to 'userDetails'
      $location.hash("userDetails");
      // scroll down to the set location
      $anchorScroll();
    }

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";

      // reset the user
      $scope.user = null;

      $location.hash("errorDetails");
      $anchorScroll();
    };

    // get the username from the URL using $routeParams service
    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "+language"; // use '-' for descending order

    // get the user - this is executed as soon as the controller is created
    github.getUserDetails($scope.username).then(onUserComplete, onError);
  };

  // get the app module - ask angular to give reference to myApp
  var app = angular.module("myApp");

  // add controller to app module and name it 'retrieveFromServerController'
  app.controller("userDetailsController", controller);

}());
