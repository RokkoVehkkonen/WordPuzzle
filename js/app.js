var wordPuzzleApp = angular.module('wordPuzzleApp', ['ngRoute']);
  
    wordPuzzleApp.config(function($routeProvider) {
        $routeProvider

             .when('/play', {
                templateUrl : 'assets/templates/play.html',
                controller  : 'PlayController'
            })
            .otherwise( {
                templateUrl : 'assets/templates/scores.html',
                controller  : 'ScoresController'
            });   
    });
    
    
