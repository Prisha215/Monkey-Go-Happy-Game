var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage; 
var FoodGroup, obstaclesGroup; 
var score, groundImage; 
var survivalTime,bg;

function preload(){
  monkey_running =          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"); 
  
  groundImage = loadImage("jungle.jpg"); 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500, 400);
  
  ground=createSprite(400,350,900,10);
  //ground.velocityX=-4;
  //ground.x=ground.width/2;
  //console.log(ground.x);
  
  //invisibleground=createSprite(400,350,900,10);
  
  bg = createSprite(250,200); 
  bg.addImage(groundImage);
  bg.scale = 3.2; 
  bg.velocityX=-4;
  bg.x=bg.width/2;
  
  monkey=createSprite(80,315,20,20); 
  monkey.addAnimation("running",monkey_running );
  monkey.scale=0.1;
  
  FoodGroup = new Group(); 
  obstaclesGroup = new Group(); 
}

function draw() {
  background(180);
  
  //for creating infinite ground
  if(bg.x<0){
    bg.x = bg.width/2; 
  }
  
  //for making the monkey to jump
  if (keyDown("space")) {
    monkey.velocityY=-10;  
  }
  
  //adding gravity to the monkey 
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  food(); 
  spawnObstacles();
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
  
    //assign lifetime to the variable
    banana.lifetime = 200;
    banana.scale = 0.1; 
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(500,350,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3; 
    //obstacle.velocityX = -(6 + score/100);
    
    //generate random obstacles
    //var rand = Math.round(random(1,6));
    //switch(rand) {
    //  case 1: obstacle.addImage(sprite_0.png);
    //          break;
    //  case 2: obstacle.addImage(sprite_1.png);
    //          break;
    //  case 3: obstacle.addImage(sprite_2.png);
    //          break;
    //case 4: obstacle.addImage(sprite_3.png);
    //        break;
    //case 5: obstacle.addImage(sprite_4.png);
    //        break;
    //case 6: obstacle.addImage(sprite_5.png);
    //        break;
    //default: break;
    //}
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
  
function time(){
  var survivalTime=0;
  stroke("white");
  textSize=20;
  fill("white");
  text("Score;"+score,500,50);
  
  stroke("black");
  textSize=20;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()); 
  text("SurvivalTime:"+survivalTime,100,50);  
}