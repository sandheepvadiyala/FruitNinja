var PLAY = 1;
var END = 0;
var gameState =1;

var sword, swordImg, monster, monsterImg, gameOverImage, score, r, fruitGroup, enemyGroup;

var fruit, fruit1, fruit1Img, fruit2, fruit2Img, fruit3, fruit3Img, fruit4, fruit4Img;

function preload(){
  
swordImg = loadImage("sword.png");
fruit1Img = loadImage("fruit1.png")
fruit2Img = loadImage("fruit2.png")
fruit3Img = loadImage("fruit3.png")
fruit4Img = loadImage("fruit4.png")
monsterImage = loadAnimation("alien1.png", "alien2.png")
gameOverImage = loadImage("gameover.png")
  
knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
gameOverSound = loadSound("gameover.mp3")
  
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImg);
  sword.scale = 0.7
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw(){
  background("lightblue")
  
  
  if(gameState===PLAY){
  
  fruits();
  Enemy();
  
    sword.y = World.mouseY;
    sword.x = World.mouseX
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2
      
    }
    
  } 
  
     if(enemyGroup.isTouching(sword)){
       
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       fruitGroup.setVelocityXEach(0);
       enemyGroup.setVelocityXEach(0);
       gameState=END;
       gameOverSound.play();
       sword.addImage(gameOverImage);
       sword.x = 200;
       sword.y = 200;
     }
   
 
    drawSprites();
  textSize(30);  
  text("Score : " + score,250,30);
  
}

function fruits(){

  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Img);   
    }else if (r == 2){
    fruit.addImage(fruit2Img);
    } else if (r == 3){
    fruit.addImage(fruit3Img);
  } else {
    fruit.addImage(fruit4Img);
  }
   
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit)
}
}

function Enemy(){
  if (World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage)
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
    
}

 position = Math.round(random(1,2));
  fruit = createSprite(400,200,20,20);
  
  if(position==1)
  {
    fruit.x = 400;
    fruit.velocityX = -(7+(score/4));
  }
  else
  {
    if (position==2){
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
  }