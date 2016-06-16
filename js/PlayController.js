   
   wordPuzzleApp.controller('PlayController', function($scope, $http) {
      $scope.playerTotalScore = null;
      
      $scope.gameScore = 0;
      $scope.gameDuration = 40000;
      $scope.timeLeft = null;

      $scope.wordScore = null;
      $scope.maxWordScore = null;
      $scope.rightWord = null;
      $scope.userWord = null;
      $scope.lastUserWord = null;
      $scope.mangledWord = null;
                  
      $scope.getNewWord = function(){
                
          var qstring = "page.php?command=getNewWord";
          

        //mock
        $scope.rightWord = 'island';
        
        
        $scope.mangledWord = mangle($scope.rightWord);
        $scope.userWord = '';  
        $scope.lastUserWord = '';
        $scope.maxWordScore = getMaxScore($scope.rightWord.length);
        $scope.wordScore = $scope.maxWordScore;
      } 
      
      $scope.newGame = function(){
        $scope.timeLeft = $scope.gameDuration;
        $scope.gameScore = 0;
      }      
      
      function getMaxScore(length){
      
        var max = Math.floor(Math.pow(1.95,(length/3)));
        
        return max;
      }
      
      function mangle(word){
          
          //mock
          return 'ainlds';          
      } 

      $scope.userWordChanged = function(){
           
        if ($scope.lastUserWord.length >= $scope.userWord.length && $scope.wordScope > 0)
          $scope.wordScore --;           
          
        if ($scope.userWord.toLowerCase() == $scope.rightWord)
          $scope.getNewWord();  
          
        $scope.lastUserWord = $scope.userWord;  
                    
      } 
 
      $scope.getNewWord(); 
          
  });
     
