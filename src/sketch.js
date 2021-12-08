var GRAVITY = 1;
var JUMP = 20;

var Level_W = 10000;
var Level_H = 400;

var player, ground, platform;

var playerImg, BGImg, platfromImg, groundImg;

function setup() {
  createCanvas(800,400);
  camera.zoom = 0.5;

  player = createSprite(400, 200);
  player.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  player.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  
  platform = createSprite(400, 400);
  platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png')
}

function draw() {
  background(255,255,255);
  console.log("PlayerXpos",player.position.x);
  console.log("PlayerYpos",player.position.y);

  player.velocity.y += GRAVITY;

  if (player.collide(platform)) {
    player.velocity.y = 0;
    player.changeAnimation('normal');
  }

  if (keyWentDown('UP') || keyWentDown('SPACE') && player.collide(platform)) {
    player.changeAnimation('stretch');
    player.animation.rewind();
    player.velocity.y = -JUMP;
  }

  //player.velocity.x = 1000;

  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  if (player.position.x <= 0) {
    player.position.x = 0;
    //camera.position.x = player.position.x+200;
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

  drawSprites();
}