angular.module('TickTalk').controller('PostsController', ['$http', '$scope', '$stateParams', 'posts', function($http, $scope, $stateParams, posts){

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
