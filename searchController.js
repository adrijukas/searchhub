// This controller is mainly resposible for managing the search form
// and running a countdown, at the end of which a search would be performed
(function() {

  var controller = function($scope, $interval, $location) {

    // it's not necessary to pass in 'username' here, $scope already has it
    var userSearch = function(username) {
      // instead of storing this function into a boolean and then
      // check its value on the mark up to hide it if 'true',
      // I could have set $scope.countdown = null; which would
      // make the {{countdown}} on html evaluate to 'null' and disappear
      if (!$scope.intervalCancelled) {
        $scope.intervalCancelled = cancelInterval();
      }

      // have search engine navigate to the new route
      $location.path("/user/" + username);
    };

    $scope.searchAll = function() {
      // prevents from being submitted as part of 'Search' form
      // only gets executed on 'Search All' button click
      $scope.v = 0;

      console.log("Search All clicked");

      if (!$scope.intervalCancelled) {
        $scope.intervalCancelled = cancelInterval();
      }

      $location.path("/users");
    }

    var cancelInterval = function() {
      if (intervalPromise) {
        return $interval.cancel(intervalPromise);
      }
      return false;
    };

    // decrements countdown every time the function is called
    // until it reaches 0, at whcih point the search is initiated
    var decrementCountdown = function() {
      $scope.countdown--;
      if ($scope.countdown < 1) {
        userSearch($scope.username);
      }
    };

    var intervalPromise = null;
    var startCountdown = function() {
      // calls interval service, passing in decrementCountdown function
      // which is gonna be executed once every second (1000ms) and the starting
      // countdown value
      intervalPromise = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = userSearch;

    // default value for the search form
    $scope.username = "angular";
    $scope.countdown = 5;

    // this will be invoked instantly, unlike the other functions, which are invoked
    // using ng directives on the html
    startCountdown();
  };

  // get the app module - ask angular to give reference to myApp
  var app = angular.module("myApp");

  // add controller to app module and name it 'retrieveFromServerController'
  app.controller("searchController", controller);

}());
