var app = angular.module('TickTalk', ['ngRoute']);

// main controller for app..
app.controller('MainController', ['$http', '$scope', 'posts', function($http, $scope, posts) {

  var controller = this;

  this.posts = posts.posts;

  this.addPost = function() {

    // Prevent against blank title and body entries.. maybe do this at the database / model levels instead? Once rails is set up..
    if(!controller.title || controller.title === '') {
      console.log("title was blank");
      return;
    } else if (!controller.body || controller.body === ''){
      console.log("body was blank");
      return;
    }

    // how to save in the model? maybe save as a string and split it to display? or just leave out completely for now.
    // var tagsArray = controller.tags.split(/, \s?/);
    // console.log("tags array is: ", tagsArray);

    // won't be using this code now that we'll be saving to the database..

    // controller.posts.push({
    //   title: controller.title,
    //   body: controller.body,
    //   // tags: tagsArray,
    //   rating: 0
    //   // comments: [
    //   //   {
    //   //     author: 'Kevin',
    //   //     commentBody: 'Hella tight brah!',
    //   //     rating: 0
    //   //   },
    //   //   {
    //   //     author: 'Rick',
    //   //     commentBody: 'Wubba lubba dub dub!',
    //   //     rating: 0
    //   //   },
    //   //   {
    //   //     author: 'Tiny Rick',
    //   //     commentBody: 'Grass...tastes bad!',
    //   //     rating: 0
    //   //   },
    //   // ]
    // });

    posts.create({
      title: controller.title,
      body: controller.body
    });

    controller.title = "";
    controller.body = "";
    // controller.tags = "";
  };

  this.incrementRating = function(post) {
    posts.incrementRating(post);
  };

  this.decrementRating = function(post) {
    posts.decrementRating(post);
  };

}]);

app.controller('PostsController', ['$http', '$scope', '$routeParams', 'posts', function($http, $scope, $routeParams, posts){

  var controller = this;

  // not passing in the specific object anymore.. going to go through the posts factory
  // this.post = post;

  this.post = posts.posts[$routeParams.id];

  this.addComment = function() {

    console.log("inside the addComment function!");

    // Prevent against blank comment. also do this on model / db level..
    if(!controller.commentBody || controller.commentBody === '') {
      console.log("comment was blank");
      return;
    }

    // not doing it this way anymore!
    // controller.post.comments.push({
    //   author: 'current_user', // this will change later
    //   commentBody: controller.commentBody,
    //   rating: 0
    // });

    // new way:
    posts.addComment(post.id, {
      commentBody: controller.commentBody,
      author: 'current_user',
    }).then(function(comment) {
      controller.post.comments.push(comment);
    }, function(error){
      console.log("error saving the comment: ", error);
    });

    controller.commentBody = "";
  };

  this.incrementRating = function(comment) {
    posts.incrementCommentRating(post, comment);
  };

  this.decrementRating = function(comment) {
    posts.decrementCommentRating(post, comment);
  };

}]);

// factory for posts..
app.factory('posts', ['$http', function($http){

  var postObj = {
    posts: []
  };

  this.getAllPosts = function() {
    // didn't work this way (with jbuilders). Trying another way..
    // $http.get('/posts').then(function(data) {
    //   console.log("data inside of get /posts is: ", data);
    //   // postObj.posts = data.posts;
    // }, function(error){
    //   console.log("you had an error: ", error);
    // });

    return $http.get('/posts.json').then(function(data){
        angular.copy(data, postObj.posts);
    }, function(error){
        console.log("you got an error, dummy: ", error);
    });
  }

  this.create = function(post) {
    return $http.post('/posts.json', post).then(function(data){
      postObj.posts.push(data);
    }, function(error){
        console.log("you got an error, dummy: ", error);
    });
  };

  this.incrementRating = function(post) {
  return $http.put('/posts/' + post.id + '/incrementRating.json').then(function(data){
      post.rating += 1;
    }, function(error){
      console.log("you made another mistake! this time: ", error);
    });
  };

  this.decrementRating = function(post) {
  return $http.put('/posts/' + post.id + '/decrementRating.json').then(function(data){
      post.rating -= 1;
    }, function(error){
      console.log("you made another mistake! this time: ", error);
    });
  };

  this.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    }, function(error){
      console.log("oh wow another error! you're on a roll: ", error);
    });
  };

  this.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  };

  this.incrementCommentRating = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/incrementCommentRating.json').then(function(data){
        comment.rating += 1;
      }, function(error){
          console.log("error incrementing the comment rating: ", error);
      });
  };

  this.decrementCommentRating = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/decrementCommentRating.json').then(function(data){
        comment.rating -= 1;
      }, function(error){
          console.log("error decrementing the comment rating: ", error);
      });
  };

  return postObj;

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({ enabled: true });

  $routeProvider.
  when('/', {
    templateUrl: 'app/views/layouts/home.html',
    controller: 'MainController',
    controllerAs: 'mainCtrl'
  }).
  when('/posts/:id', {
    templateUrl: 'app/views/layouts/posts.html',
    controller: 'PostsController',
    controllerAs: 'postsCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

// ui-router config stuff.. commenting out for now
// app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
//
//   // getting stuck in an infinite loop with this line..
//   $urlRouterProvider.otherwise('/home');
//
//   $stateProvider.state('home', {
//     url: '/home',
//     templateUrl: '/home.html',
//     controller: 'MainController',
//     resolve: {
//       // postPromise: ['posts', function(posts){
//       //   return posts.getAllPosts();
//       // }]
//     }
//   });
//
//   $stateProvider.state('posts', {
//     url: '/posts/:id',
//     templateUrl: '/posts.html',
//     controller: 'PostsController',
//     resolve: {
//       // post: ['$stateParams', 'posts', function($stateParams, posts) {
//       //   return posts.get($stateParams.id);
//       // }]
//     }
//   });
//
//   // found this workaround here: https://github.com/angular-ui/ui-router/issues/600
//   // but, now it doesn't render anything at all. UGH.
//   // $urlRouterProvider.otherwise(function($injector, $location) {
//   //   var $state = $injector.get("$state");
//   //   $state.go('home');
//   // });
//
// }]);
