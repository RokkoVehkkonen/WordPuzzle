   
   wordPuzzleApp.controller('PlayController', function($scope, $http) {
      $scope.playerTotalScore = null;
      
      $scope.gameScore = 0;
      $scope.gameDuration = 40000;
      $scope.timeLeft = null;

      $scope.wordScore = 0;
      $scope.maxWordScore = null;
      $scope.rightWord = null;
      $scope.userWord = null;
      $scope.lastUserWord = null;
      $scope.mangledWord = null;
      
      $scope.playerId = 695;  
      $scope.playerScore = null;    
      
      
            
      $scope.getNewWord = function(){
             
         $scope.gameScore += $scope.wordScore;    
                
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

      $scope.getPlayerScore = function(){
                
         var qs = 'http://www.techlinx.info/scorefeed.php?command=getScore&id=' + $scope.playerId;       
                
         $http.get(qs)
          .then(function(response) {
            $scope.playerScore = response.data[0].Score;
       });
        
      } 

      
      $scope.newGame = function(){
        
        $scope.getPlayerScore();
      
        $scope.timeLeft = $scope.gameDuration;
        $scope.gameScore = 0;
        
        $scope.getNewWord(); 

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
           
        if ($scope.lastUserWord.length >= $scope.userWord.length && $scope.wordScore > 0)
          $scope.wordScore --;           
          
        if ($scope.userWord.toLowerCase() == $scope.rightWord)
          $scope.getNewWord();  
          
        $scope.lastUserWord = $scope.userWord;  
                    
      } 
 
      $scope.newGame();     
  });
     