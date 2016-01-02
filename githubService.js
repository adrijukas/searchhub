(function() {

  // my service has a dependencie on another services - $http
  var github = function($http) {

    // get the user
    // the caller of this function will still get a promise returned
    var getUser = function(username) {
      return getData("https://api.github.com/users/" + username);
    };

    // get the repositories for the user
    // the caller of this function will still get a promise returned
    var getRepos = function(user) {
      return getData(user.repos_url);
    };

    var getData = function(input) {
      // $http.get() NEVER returns the data immediately
      // it returns a 'promise' first, therefore need to call then() function
      // this is an async operation
      return $http.get(input).then(function(response) {
        return response.data;
      });
    };

    // chaining the calls to get repo and contributors together.
    // It uses the result of a previous asynchronous call to trigger a next one
    // If then() callback returns another promise, the next then() 
    // will only be executed once that promise resolves. 
    // This pattern can be used for serial HTTP requests, 
    // for example where a request depends on the result of a previous one
    var getRepoDetails = function(username, reponame) {
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      var repo;

      return $http.get(repoUrl).then(function(response) {
          repo = response.data;
          return $http.get(repoUrl + "/contributors");
        })
        .then(function(response) {
          repo.contributors = response.data;
          return repo;
        });
    }

    // returns an object that is the github service
    return {
      getUser: getUser,
      getRepositories: getRepos,
      getRepoDetails: getRepoDetails
    };

  };

  var app = angular.module("myApp");

  // register the service with the module
  app.factory("github", github);

}());