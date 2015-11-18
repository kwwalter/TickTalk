var app = angular.module('TickTalk', []);

// Adding ui-router as a dependency, but probably don't have to..
// angular.module('TickTalk', ['ui.router']);

// main controller for app..
app.controller('MainController', ['$http', '$scope', 'posts', function($http, $scope, posts) {
  
  var controller = this;

  this.test = "testing!";
  this.posts = posts.posts;

  this.addPost = function() {

    // Prevent against blank title and body entries.. maybe do this at the database / model levels instead? Once rails is set up..
    if(!controller.title || controller.title === '') {
      return;
    } else if (!controller.body || controller.body === ''){
      return;
    }

    var tagsArray = controller.tags.split(', ');

    controller.posts.push({
      title: controller.title,
      body: controller.body,
      tags: tagsArray,
      upvotes: 0
    });
    controller.title = "";
  };

  this.incrementVote = function(post) {
    post.upvotes += 1;
  };

  this.decrementVote = function(post) {
    post.upvotes -= 1;
  };

}]);

// factory for posts..
app.factory('posts', [function(){

  var postObj = {
    posts: []
  };
  return postObj;

}]);

// ui-router config stuff..
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    url: '/home',
    templateURL: '/home.html',
    controller: 'MainController'
  });

  $urlRouterProvider.otherwise('home');

}]);
