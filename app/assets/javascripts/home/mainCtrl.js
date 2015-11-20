// main controller for app..
angular.module('TickTalk').controller('MainController', ['$http', '$scope', 'posts', function($http, $scope, posts) {

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
