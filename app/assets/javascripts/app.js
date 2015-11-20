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

    // how to save in the model? maybe save as a string and split it to display? or just leave out completely for now.
    // var tagsArray = $scope.tags.split(/, \s?/);
    // console.log("tags array is: ", tagsArray);

    // won't be using this code now that we'll be saving to the database..

    // $scope.posts.push({
    //   title: $scope.title,
    //   body: $scope.body,
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
      title: $scope.title,
      body: $scope.body
    });

    $scope.title = "";
    $scope.body = "";
    // $scope.tags = "";
  };

  $scope.incrementRating = function(post) {
    posts.incrementRating(post);
  };

  $scope.decrementRating = function(post) {
    posts.decrementRating(post);
  };

}]);

app.controller('PostsController', ['$http', '$scope', 'post', 'posts', function($http, $scope, post, posts){

  // don't need $stateParams anymore..
  // $scope.post = posts.posts[$stateParams.id];

  $scope.post = post;

  $scope.addComment = function() {

    console.log("inside the addComment function!");

    // Prevent against blank comment. also do this on model / db level..
    if(!$scope.commentBody || $scope.commentBody === '') {
      console.log("comment was blank");
      return;
    }

    // not doing it this way anymore!
    // $scope.post.comments.push({
    //   author: 'current_user', // this will change later
    //   commentBody: $scope.commentBody,
    //   rating: 0
    // });

    // new way:
    posts.addComment(post.id, {
      commentBody: $scope.commentBody,
      author: 'current_user',
    }).then(function(comment) {
      $scope.post.comments.push(comment);
    }, function(error){
      console.log("error saving the comment: ", error);
    });

    $scope.commentBody = "";
  };

  $scope.incrementRating = function(comment) {
    posts.incrementCommentRating(post, comment);
  };

  $scope.decrementRating = function(comment) {
    posts.decrementCommentRating(post, comment);
  };

}]);

// factory for posts..
app.factory('posts', ['$http', '$scope', function($http, $scope){

  var postObj = {
    posts: []
  };
  // return postObj;

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

  this.inrementCommentRating = function(post, comment) {
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

}]);

// ui-router config stuff..
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainController',
    resolve: {
      postPromise: ['posts', function(posts){
        return posts.getAllPosts();
      }]
    }
  });

  $stateProvider.state('posts', {
    url: '/posts/:id',
    templateUrl: '/posts.html',
    controller: 'PostsController',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.get($stateParams.id);
      }]
    }
  });

  // getting stuck in an infinite loop with this line..
  $urlRouterProvider.otherwise('/home');

  // found this workaround here: https://github.com/angular-ui/ui-router/issues/600
  // but, now it doesn't render anything at all. UGH.
  // $urlRouterProvider.otherwise(function($injector, $location) {
  //   var $state = $injector.get("$state");
  //   $state.go('home');
  // });

}]);
