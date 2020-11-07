class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    console.log(player1.width);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

    fruitGroup = createGroup();

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y= 500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    //player.x += 10;
                    player.distance -= 5
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    //player.x -=10;
                    player.distance += 5
                    player.update();
                }
            
                 if (frameCount % 100 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 10;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                                 break;
                         case 2: fruits.addImage("fruit2", fruit2_img);
                                 break;
                         case 3: fruits.addImage("fruit3", fruit3_img);
                                 break;
                         case 4: fruits.addImage("fruit4", fruit4_img);
                                 break;
                         case 5: fruits.addImage("fruit5", fruit5_img);
                         default: break;
                     }
                     fruitGroup.add(fruits);
                 
                 }
                 
                 if (player.index !== null) {
                    //fill code here, to destroy the objects.
                       if(fruitGroup.isTouching(player1) || fruitGroup.isTouching(player2)){
                        player.playerScore += 1;
                       //player1Score = player1Score + 1;
                       fruitGroup.destroyEach();
                       player.updateScore(playerScore);
                       player.update();
                    }
                    
                    /*if(fruitGroup.isTouching(player2)){
                        player.score = player.score + 1;
                        //player2Score = player2Score + 1;
                        fruitGroup.destroyEach();
                        player.update(score);
                     }*/
                 }

                 fill("white")
                 textSize(24);
                /*text("Player 1 Score: " + player1Score, 100, 50);
                 text("Player 2 Score: " + player2Score, 100, 100);
                 */
                 text("Players Score: " + player.playerScore, 100, 50);
                 //text("Player 2 Score: " + player.score, 100, 100);
                  //drawSprites();
    }

    end(){
       console.log("Game Ended");
    }
}