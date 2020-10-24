
var monkey , monkey_running,monkey_stopped
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survive = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped= loadAnimation("sprite_0.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stopped", monkey_stopped);
  monkey.scale = 0.15;
  
  ground = createSprite(400,350,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x)
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
}


function draw() {
  background(255);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(ground.x < 0){
      ground.x = ground.width/2;
    }

  monkey.collide(ground);
  
   if(gameState === PLAY){

    if(keyWentDown("space")){
      monkey.velocityY = -15;
    }

     survive = survive + Math.round(getFrameRate() / 60.5);

    if(monkey.isTouching(FoodGroup)){
      score = score + 1;
      FoodGroup.destroyEach();  
    }
     
     Banana();
     Obstacle();
   }
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
  }
  
   else if (gameState === END) {
     monkey.changeAnimation("stopped", monkey_stopped);
     monkey.velocityY = 0;
     
     ground.velocityX=0;
     
     obstacleGroup.setVelocityEach = 0;
     
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
     textSize(24);
     text("Game Over", 200,200);
     
   }

    stroke("black");
    textSize(18);
    text("Score: " + score, 360,70)


    stroke("black");
    textSize(16);

    text("Surviaval Time: " + survive, 360,50)
  
drawSprites();  
}

function Banana()
{
  if(World.frameCount%100===0)
  {
    var banana= createSprite(500,random(150,240),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.12;
    banana.lifetime=400;
    FoodGroup.add(banana);
  }
}

function Obstacle()
{
  if (World.frameCount%100===0)
  {
    var obstacle= createSprite(500,320,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.18;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}






