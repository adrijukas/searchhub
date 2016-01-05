(function() {

  var controller = function($scope, github) {

    var onUsersComplete = function(data) {
      $scope.users = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };

    github.getUsers().then(onUsersComplete, onError);
  };

  var app = angular.module("myApp");
  app.controller("usersController", controller);

}());
