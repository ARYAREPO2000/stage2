var bg,ground, groundImg, cityBG; 
var hero, heroImg;
var gameState;
var titleImg, title;
var bulletImg, bulletGroup;
var bot1Img, bot2Img, bot3Img, botGroup1, botGroup2, botGroup3;
var bgSound;
var score;
var missileImg, missileGroup;
var edges;

function preload(){
heroImg = loadImage("./Images/Survivor_0.png");
cityBG = loadImage("./Images/Disaster.png");
bulletImg = loadImage("./Images/bullet1.png");
missileImg = loadImage("./Images/fireball.png");
bot1Img = loadAnimation("./Images/bot10.png","./Images/bot11.png")
bot2Img = loadAnimation("./Images/spiker0.png","./Images/spiker1.png")
bot3Img = loadAnimation("./Images/fighter.png")
bgSound = loadSound("./sound/bg.wav");
titleImg = loadImage("./Images/title.png")





}

function setup() {
  createCanvas(windowWidth, windowHeight);
   bg = createSprite(width/2, height/2, width*1.2, height);
   bg.addImage(cityBG);
   bg.scale = 2;
   bg.visible = false;
   bg.velocityX = -2

   title = createImg("./Images/title.png");
   //title.addImage(titleImg);
   title.position(width/2-370, height/2-200)
   //title.size = 0.5
   //title.visible = false


  
  ground = createSprite (width/2, height-10, width, 10)
  ground.visible = false;

  hero = createSprite(300,300,30,20);
  hero.addImage(heroImg);
  hero.scale = 0.15;
  hero.visible = false;

  bulletGroup  =  new Group();
  missileGroup = new Group();
  botGroup1 = new Group();
  botGroup2 = new Group();
  botGroup3 = new Group();

  gameState = "start";

  score = 0
}

function draw() {
  background(0);

  if (gameState === "start") {
    
    //title.visible = true;

    textSize(40);
    stroke("Red");
    fill("yellow")
    strokeWeight(7);
    text("PRESS SPACE TO START THE GAME", width/2 - 300, height/2 + 100);

    text("YOUR MISSION: KILL AS MUCH ROBOTS AS POSSIBLE TILL YOUR DEATH", width/2 - 650, height/2 + 200);

    textSize(40);
    stroke("blue");
    fill("white")
    strokeWeight(5);
    text("SHOOT BULLETS: SPACE BAR, FIREBALLS(FOR BOSS): M KEY", width/2-550, height/2 + 300)
    if (keyDown("space")) {
      gameState = "play";
    }
    
  } else if(gameState === "play"){

    if (!bgSound.isPlaying()) {
      bgSound.play()
      
    }
      play()
    
    
  } else{
    bgSound.stop()
    textSize(35);
    text("GAME OVER", width/2, height/2);
  }

}


function play(){
  hero.visible = true;
  hero.collide(ground);
  bg.visible = true
  title.hide()



  if(bg.x-400 < 0){
    bg.x = width/2+450
  }
  
  if (keyDown(LEFT_ARROW)) {
    hero.x = hero.x - 10 ;
  }

  if (keyDown(RIGHT_ARROW)) {
    hero.x = hero.x + 10;
  }

  if (keyDown(UP_ARROW)) {
    hero.velocityY = hero.velocityY-0.8;

  }
  hero.velocityY = hero.velocityY + 0.5  

  if (bulletGroup.isTouching(botGroup1)) {
    botGroup1.destroyEach();
    score += 2
  }

  if (bulletGroup.isTouching(botGroup3)) {
    botGroup3.destroyEach();
    score += 3
  }

  if(missileGroup.isTouching(botGroup2))
   {
    botGroup2.destroyEach();
    score += 10
   }


  if (hero.isTouching(botGroup1) || hero.isTouching(botGroup2)
   || hero.isTouching(botGroup3)) {
    gameState = "end"
  }

  spawnBot1();
  spawnBot2();
  spawnBot3();
  drawSprites();

  textSize(30);
  stroke("Red");
  fill("yellow");
  strokeWeight(7);
  text("SCORE :"+ score, width-1800, 50);
  
  

}

function keyPressed(){

  if (keyCode === 32) {
    var bullet = createSprite(hero.x, hero.y);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 30
    bullet.lifetime = width/30
    bulletGroup.add(bullet)
    
  }

  if (keyCode === 77) {
    var missile = createSprite(hero.x, hero.y);
    missile.addImage(missileImg);
    missile.scale = 0.2
    missile.velocityX = 30
    missile.lifetime = width/30
    missileGroup.add(missile)
    
  }


}

function spawnBot1(){
  if (frameCount%50 == 0){
    var bot1 = createSprite(width, height-10);
    bot1.y = Math.round(random(250,height-10));
    bot1.addAnimation("bot1",bot1Img)
    bot1.velocityX = -(10+score/10);
    bot1.lifetime = width/10;
    botGroup1.add(bot1)}

    
  }

  function spawnBot3(){
    if (frameCount%125 === 0){
      var bot3 = createSprite(width, height-10);
      bot3.y = Math.round(random(250,height-10));
      bot3.addAnimation("bot3",bot3Img)
      bot3.scale = 3
      bot3.velocityX = -(20*score/20);
      bot3.lifetime = width/10;
      botGroup3.add(bot3)}
  
      
    }
  
  function spawnBot2(){
  
      if (frameCount%630 === 0){
      var bot2 = createSprite(width, height-10);
      bot2.y = Math.round(random(499,498));
      bot2.addAnimation("bot2",bot2Img)
      bot2.setCollider("circle",0,0,70);
      bot2.scale = 3
      bot2.velocityX = -(10*score/20);
      bot2.lifetime = width/10;
      botGroup2.add(bot2)
      
    }
  

}


function end(){

  hero.velocityX = 0
    hero.velocityY = 0
    hero.visible = false

  
}