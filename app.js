var active = true;
$(document).ready(function(){
  console.log("Connected!");


//create lisentener for each player. PS don't tell them about one of the keys. CHEAT CODE!
  var player1 = new Player("Player 1", 49, 90, "p1");
  var player2 = new Player("Player 2", 48, 190, "p2");
  playerMoveListener(player1, player2);

  // resets game
  $('.reset').on("click", resetGame);
});

function resetGame(e){
  $(".topsize").css("left",("0"));
  $(".topsize").addClass("startingtop");
  $(".topsize").removeClass("losingtop");

  // TODO: can we run this as an object method?
  $(".bottomsize").css("left",("0"));
  $(".bottomsize").removeClass("losingbot");
  $(".bottomsize").addClass("startingbot");

  $(".showwinner").text("");
  active = true;
}

//MOVING
function Player(name, key1, key2, classSelector) {
  this.name = name;
  this.keys = [key1, key2]; //array that accepts ASCII codes
  this.$selector = $("." + classSelector); // $ to indicate  attribute is accessing jQuery (naming convention)
  this.wins = 0;
  this.move = function(){
    this.$selector.css("left",("+=20px"));
  };

}
function playerMoveListener(player1, player2){ //function will exectute Player.move
  $(document).keyup(function (e){
    imageChanger(player1, player2);
    if (player1.keys.indexOf(e.which) !== -1  && active){ /*checking the indexOf keys indexes that !== -1*/
      player1.move();
      winChecker(player1);
      // scoreBoard(player1);
    }
    else if (player2.keys.indexOf(e.which) !== -1 && active){
      player2.move();
      winChecker(player2);
    }
    scoreBoard(player1,player2);
  });
}

function winChecker(p){   //displays winner at the bottom of the screen after crossing the finish line
  if (p.$selector.offset().left > 1350){
    console.log(p.name + " Wins!");
    $(".showwinner").text(p.name + " wins!");

  }
}
function scoreBoard(player1,player2){  //TODO: Fix incrementer! scoreboard doesn't reflect correct record
  if (player1.$selector.offset().left > 1350 && active){
    player1.wins +=1;
    $(".win1").text(player1.wins);
    active = false;
    // execute code here to stop people from being able to race.
  }
  if (player2.$selector.offset().left > 1350 && active){
    player2.wins +=1;
    $(".win2").text(player2.wins);
    active = false;
    // execute code here to stop people from being able to race.
  }

  // if (player.$selector.offset().left > 1350 && active){
  //   player.wins +=1;
  //   $(player.winSelector).text(player.wins);
  //   active = false;
  //   // execute code here to stop people from being able to race.
  // }

}
function imageChanger(player1, player2){ //switch out imgs and make someone cry!
  if (player1.$selector.offset().left < player2.$selector.offset().left){
    player1.$selector.removeClass("startingtop").addClass("losingtop");
    player2.$selector.removeClass("losingbot").addClass("startingbot");
  }
  else if (player1.$selector.offset().left > player2.$selector.offset().left){
    player2.$selector.removeClass("startingbot").addClass("losingbot");
    player1.$selector.removeClass("losingtop").addClass("startingtop");
  }
}
