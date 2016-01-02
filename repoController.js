(function() {
  
  var controller = function($scope, github, $routeParams) {
    
    var onRepoComplete = function(data) {
      $scope.repo = data;
      $scope.error = null;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
      $scope.repo = null;
    };

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    
    github.getRepoDetails($scope.username, $scope.reponame).then(onRepoComplete, onError);
  };
  
  var app = angular.module("myApp");
  app.controller("repoController", controller);
  
}());