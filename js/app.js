var wordPuzzleApp = angular.module('wordPuzzleApp', ['ngRoute']);
  
    wordPuzzleApp.config(function($routeProvider) {
        $routeProvider

            .when('/play', {
                templateUrl : 'assets/templates/play.html',
                controller  : 'PlayController'
            })
            .when('/gameover', {
                templateUrl : 'assets/templates/gameover.html',
                controller  : 'GamoverController'
            })
            .otherwise( {
                templateUrl : 'assets/templates/scores.html',
                controller  : 'ScoresController'
            });   
    });
    
    
