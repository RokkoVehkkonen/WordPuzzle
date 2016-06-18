     
   wordPuzzleApp.controller('ScoresController', function($scope, $http) {
         
      $scope.scores = null;

      function getScores(){
                
         var qs = 'http://www.techlinx.info/scorefeed.php?command=getScores';       
                
         $http.get(qs)
          .then(function(response) {
            $scope.scores = response.data;
       });
        
      } 
      
      getScores();   
          
  });
     