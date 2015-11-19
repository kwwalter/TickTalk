var app = angular.module('TickTalk', ['ui.router', 'templates']);

// ui-router config stuff..
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.when('', '/');

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'home/_home.html.erb',
    controller: 'MainController'
  });

  $stateProvider.state('posts', {
    url: '/posts/:post_id',
    templateUrl: 'posts/_posts.html.erb',
    controller: 'PostsController'
  });

  $urlRouterProvider.otherwise('home');

}]);
