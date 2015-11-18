var app = angular.module('TickTalk', ['ui.router']);

// main controller for app..
app.controller('MainController', ['$http', '$scope', 'posts', function($http, $scope, posts) {

  // maybe can't use this with ui-router?
  // var controller = this;

  // this.test = "testing!";
  $scope.posts = posts.posts;

  $scope.addPost = function() {

    console.log("inside the addPost function!");

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
          comment: 'Hella tight brah!',
          rating: 0
        },
        {
          author: 'Rick',
          comment: 'Wubba lubba dub dub!',
          rating: 0
        },
        {
          author: 'Tiny Rick',
          comment: 'Grass...tastes bad!',
          rating: 0
        },
      ]
    });
    $scope.title = "";
    $scope.body = "";
    $scope.tags = "";

    // $state.href('/home');
  };

  $scope.incrementRating = function(post) {
    post.rating += 1;
  };

  $scope.decrementRating = function(post) {
    post.rating -= 1;
  };

}]);

app.controller('PostsController', ['$http', '$scope', '$stateParams', 'posts', function($http, $scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id]
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
    url: '/posts/{post_id}',
    templateUrl: '/posts.html',
    controller: 'PostsController'
  });

  $urlRouterProvider.otherwise('home');

}]);
