   
   wordPuzzleApp.controller('PlayController', function($scope, $http, $interval, $location) {
      
      $scope.gameScore = 0;
      $scope.gameDuration = 4000;
      $scope.timeLeft = null;

      $scope.wordScore = 0;
      $scope.maxWordScore = null;
      $scope.rightWord = null;
      $scope.userWord = null;
      $scope.lastUserWord = null;
      $scope.mangledWord = null;
      
      $scope.playerId = 698;  
      $scope.playerScore = null;    
      
      var stop;
      var startTime = null;
            
      $scope.getNewWord = function(){
             
         if ($scope.wordScore > 0){
           $scope.gameScore += $scope.wordScore;
           $scope.playerScore += $scope.wordScore;    
            
           setPlayerScore(); 
         }    
                
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

      function getPlayerScore(){
                
         var qs = 'http://www.techlinx.info/scorefeed.php?command=getScore&id=' + $scope.playerId;       
                
         $http.get(qs)
          .then(function(response) {
            $scope.playerScore = parseInt(response.data[0].Score);
       });
        
      } 
      
      function setPlayerScore(){
        var data = $.param({ id: $scope.playerId, value: $scope.playerScore });
        
        $http({
            method: 'POST',
            url: 'http://www.techlinx.info/scorefeed.php?command=setScore',
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });     
                
      } 

      
      function newGame(){
        
        getPlayerScore();
        $scope.getNewWord(); 
     
        $scope.timeLeft = $scope.gameDuration / 1000;
        $scope.gameScore = 0;
        
        startTime = new Date().getTime();
        
        stop = $interval(function() {
            
            var d = new Date().getTime();
            
            var timePlayed = d - startTime;            
            
            if (timePlayed >= $scope.gameDuration)
              stopGame();

            $scope.timeLeft = Math.floor(($scope.gameDuration - timePlayed) / 1000);

              
          }, 100);
      }      
 
      function stopGame() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
            
            $location.path( "gameover" );
          }
      };
      
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
 
      newGame();     
  });
     