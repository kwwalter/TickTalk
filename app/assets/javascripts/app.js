var app = angular.module('TickTalk', ['ui.router']);

// main controller for app..
app.controller('MainController', ['$http', '$scope', 'posts', function($http, $scope, posts) {

  // maybe can't use this with ui-router?
  // var controller = this;

  $scope.posts = posts.posts;

  $scope.addPost = function() {

    // Prevent against blank title and body entries.. maybe do this at the database / model levels instead? Once rails is set up..
    if(!$scope.title || $scope.title === '') {
      console.log("title was blank");
      return;
    } else if (!$scope.body || $scope.body === ''){
      console.log("body was blank");
      return;
    }

    var tagsArray = $scope.tags.split(/, \s?/);
    console.log("tags array is: ", tagsArray);

    $scope.posts.push({
      title: $scope.title,
      body: $scope.body,
      tags: tagsArray,
      rating: 0,
      comments: [
        {
          author: 'Kevin',
          commentBody: 'Hella tight brah!',
          rating: 0
        },
        {
          author: 'Rick',
          commentBody: 'Wubba lubba dub dub!',
          rating: 0
        },
        {
          author: 'Tiny Rick',
          commentBody: 'Grass...tastes bad!',
          rating: 0
        },
      ]
    });
    $scope.title = "";
    $scope.body = "";
    $scope.tags = "";
  };

  $scope.incrementRating = function(post) {
    post.rating += 1;
  };

  $scope.decrementRating = function(post) {
    post.rating -= 1;
  };

}]);

app.controller('PostsController', ['$http', '$scope', '$stateParams', 'posts', function($http, $scope, $stateParams, posts){

  $scope.post = posts.posts[$stateParams.post_id];

  $scope.addComment = function() {

    console.log("inside the addComment function!");

    // Prevent against blank comment. also do this on model / db level..
    if(!$scope.commentBody || $scope.commentBody === '') {
      console.log("comment was blank");
      return;
    }

    $scope.post.comments.push({
      author: 'current_user', // this will change later
      commentBody: $scope.commentBody,
      rating: 0
    });
    $scope.commentBody = "";
  };

  $scope.incrementRating = function(comment) {
    comment.rating += 1;
  };

  $scope.decrementRating = function(comment) {
    comment.rating -= 1;
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
    templateUrl: '/home.html',
    controller: 'MainController'
  });

  $stateProvider.state('posts', {
    url: '/posts/:post_id',
    templateUrl: '/posts.html',
    controller: 'PostsController'
  });

  $urlRouterProvider.otherwise('home');

}]);