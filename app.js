(function() {

  // create app module - this controller defines the module for the app
  // [] tells me so
  // myApp module depends on ngRoute module
  var app = angular.module("myApp", ["ngRoute"]);

  // defining our routes here
  app.config(function($routeProvider) {
    // register routes for the application, here we're asking angular
    // to load a template and a controller when a certain URL is matched
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        // controller is optional, 
        // if not here, then it must be specified in the html
        controller: "searchController"
      })
       //':' means parameter onwards and used by $routeParams in a controller
      .when("/user/:username", {
        templateUrl: "user.html",
        controller:"userController"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "repo.html",
        controller: "repoController"
      })
      .otherwise({
        redirectTo: "/main"
      });

  });

}());