// IFFE used to create a controller
(function() {

  var controller = function($scope) {

    // creates object
    var person = {
      firstName: "Adria",
      lastName: "Ciute",
      company: "CGI",
      location: "London, UK",
      email: "adri***@***.com",
      followers: 251,
      blog: "http://www.samharris.org/",
      picture: "https://goo.gl/rFV8C2"
    };

    $scope.message = "Hello my first angular app!";
    $scope.employee = person;
  };

  // get the app module
  var app = angular.module("myApp");

  // add controller to app module
  app.controller("myDetailsController", controller);

}());