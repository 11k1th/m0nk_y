
var PLAY = 1; 
var END = 0;
var gamestate = PLAY;
var monkey, monkey_running,x , gameover, jump, src;
var bunano, obs, rockImg, treeImg;
var FdGrp, obsGrp
var score;
var varcar, score;
var back, backImg;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  backImg = loadImage("b.png");
  treeImg = loadImage("t.png");
  x = loadImage("back.png.png");
  bunanoImg = loadImage("banana.png");
  rockImg = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,325);

  varcar = createSprite(65,290,50,35);
  
  src = createSprite(1,1,1,1);
  
  back = createSprite(600,50,1200,300);
  back.addImage(backImg);
  back.scale=3;
  
  monkey = createSprite(65,235,20,80);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.15;
  
  gameover = createSprite(300,100,600,300);
  gameover.addAnimation("run",x);
  gameover.scale = 1.25;
  
  FdGrp = new Group();
  obsGrp = new Group();
  
}


function draw() {

  background('black');
  varcar.visible = false;
  monkey.collide(varcar);
  
  drawSprites();
  
  text("Time survived:"+score,300,20);
  
  if(gamestate===PLAY) {
    
    back.visible = true;
    
    score = Math.round(frameCount/60);
    
    back.velocityX = -5;
    if(back.x===0) {
      back.x=600
    }
    
    monkey.visible = true;
    
    if(monkey.velocityY < 0) {
    
      monkey.changeAnimation("jump",jump);
    }    
    
      monkey.velocityY = monkey.velocityY + 0.4;
    if(keyDown("space")&&monkey.y > 219) {
    
      monkey.velocityY = -10;
    }
  
    if(keyDown("up")&&monkey.y > 219) {

      monkey.velocityY = -13;
    }

    if(monkey.isTouching(obsGrp)) {

      gamestate = END;
    }
    
    gameover.visible = false;
    
    monkey.collide(varcar);

    if(frameCount%83===0) {
      
       qaze();
       obst();
    }
    
  } else if(gamestate===END) {
            
    monkey.visible = false;
    
    gameover.visible = true;
    gameover.depth = 10;
      back.velocityX = 0;
    
    if(keyDown("R") && gamestate===END && score>0) {
      
      gamestate = PLAY;
      score = 0;
    }
    
    FdGrp.destroyEach();
    obsGrp.destroyEach();
    back.visible = false;
    obsGrp.setVelocityXEach(0);
  }
}

function obst() {
  
  obs = createSprite(620,250,30,45);
  obs.velocityX = -5;
  obs.depth = 9;
  
  var rand = Math.round(random(1,4));
  switch(rand) {
    case 1: obs.addImage("rock",rockImg);
            obs.scale = 0.2;
            obs.y = 252.5;
            obs.setCollider("circle",0,0,200);
            break;
            
    case 2: obs.addImage("rock",rockImg);
            obs.scale = 0.2;
            obs.y = 252.5;
            obs.setCollider("circle",0,0,200);
            break;
            
    case 3: obs.addImage("tree",treeImg);
            obs.scale = 0.045;
            obs.y = obs.y-30;
            obs.setCollider("circle",0,0,1500); 
            break;
            
    case 4: obs.addImage("rock",rockImg);
            obs.scale = 0.2;
            obs.y = 252.5;
            obs.setCollider("circle",0,0,200);
            break;      
            
   }
  obsGrp.add(obs);
}

function qaze() {
  
  bunano = createSprite(770,150,30,45);
  bunano.velocityX = -5;
  bunano.depth = 9;
  bunano.addImage("yrrt",bunanoImg);
  bunano.scale = 0.1;
  
  FdGrp.add(bunano);
}

