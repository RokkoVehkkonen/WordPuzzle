   
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
                
         $http.get('http://randomword.setgetgo.com/get.php')
          .then(function(response) {
            $scope.rightWord = response.data.toLowerCase();
 
            $scope.mangledWord = mangle($scope.rightWord);
            $scope.userWord = '';  
            $scope.lastUserWord = '';
            $scope.maxWordScore = getMaxScore($scope.rightWord.length);
            $scope.wordScore = $scope.maxWordScore;
       });
        
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
          
          var w = new String(word);
          var retString = '';
          
          
          while (w.length > 1){
          
            var rand = Math.floor(Math.random() * w.length)
            
            retString += w[rand];
            
            if (rand == w.length - 1)
              w = w.slice(0, rand);
            else  
              w = w.slice(0, rand) + w.slice(rand + 1);
            
          }
          
          retString += w[0];
          
          return retString;          
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
     