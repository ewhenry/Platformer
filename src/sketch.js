var GRAVITY = 10;
var JUMP = 15;

var Level_W = 10000;
var Level_H = 400;

var player, ground, platform;

var playerImg, BGImg, platfromImg, groundImg;

function setup() {
  createCanvas(800,400);
  camera.zoom = 0.5;

  player = createSprite(400, 200);
  player.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  //player.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  
}

function draw() {
  background(255,255,255);
  console.log("PlayerXpos",player.position.x);
  console.log("PlayerYpos",player.position.y);

  //player.velocity.x = 1000;
  //player.velocity.y = 1;

  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  if (player.position.x <= 0) {
    player.position.x = 0;
    camera.position.x = player.position.x+200;
  }
  if (player.position.y <= 0) {
    player.position.y = 0;
  }
  if (player.position.x > Level_W) {
    player.position.x = Level_W;
  }
  if (player.position.y > Level_H) {
    player.position.y = Level_H;
  }

  player.position.y += GRAVITY;

  //drawSprites(BG);

  //camera.off();
  drawSprites();
}