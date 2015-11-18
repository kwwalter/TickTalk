var app = angular.module('TickTalk', []);

app.controller('MainController', ['$http', '$scope', function($http) {
  var controller = this;

  this.test = "testing!";
  this.posts = [
    { title: 'post 1',
      upvotes: 29
    },
    { title: 'post 2',
      upvotes: 7
    },
    { title: 'post 3',
      upvotes: 1
    },
    { title: 'post 4',
      upvotes: 43
    },
    { title: 'post 5',
      upvotes: 15
    }
  ];

  this.addPost = function() {

    // Prevent against blank title and body entries.. maybe do this at the database / model levels instead?
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
