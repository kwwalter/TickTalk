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
    controller.posts.push({
      title: controller.title,
      upvotes: 0
    });
    controller.title = ""; 
  }

}]);
