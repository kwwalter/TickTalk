angular.module('TickTalk').controller('PostsController', ['$http', '$scope', 'post', 'posts', function($http, $scope, post, posts){

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
