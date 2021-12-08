var GRAVITY = 1;
var JUMP = 20;

var Level_W = 10000;
var Level_H = 400;

var player, ground, platform;

var playerImg, BGImg, platfromImg, groundImg;

//IF TIME TRY THESE:
//https://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite9.js
//

class Player {
  render() {
    player = createSprite(400, 200);
    player.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
    player.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  }
  movement() {
    player.velocity.y += GRAVITY;

    if (keyDown('UP') || keyWentDown('SPACE')) {
      if (player.collide(platform) || player.position.y >= Level_H) {
        player.changeAnimation('stretch');
        player.animation.rewind();
        player.velocity.y = -JUMP;
      }
    } else if (player.collide(platform) || player.position.y >= Level_H) {
        player.velocity.y = 0;
        player.changeAnimation('normal');
        if (player.position.y >= Level_H) {
          player.position.y = Level_H;
        }
        
    }

    if (keyDown('RIGHT')) {
      player.velocity.x = 15;
    } else if (keyDown('LEFT')) {
      player.velocity.x = -15;
    } else {
      player.velocity.x = 0;
    }

    if (player.position.x < 0) {
      player.position.x = 0;
      //camera.position.x = player.position.x+200;
    }
    if (player.position.y < 0) {
      player.position.y = 0;
    }
    if (player.position.x > Level_W) {
      player.position.x = Level_W;
    }
  }
}

class Platform {
  render(x, y) {
    platform = createSprite(x, y);
    platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
  }


}
  
let p = new Player();
let plat = new Platform();
function setup() {
  createCanvas(800,400);

  p.render();
  plat.render(400,400);
  plat.render(0,400);

  camera.zoom = 0.5;
}

function draw() {

  p.movement();
  
  background(255,255,255);

  //console.log("PlayerXpos",player.position.x);
  //console.log("PlayerYpos",player.position.y);


  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  drawSprites();
}