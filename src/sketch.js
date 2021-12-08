var GRAVITY = 1.5;
var JUMP = 25;

var Level_W = 800;
var Level_H = 10000;

var player, ground, platform;

var playerImg, BGImg, platfromImg, groundImg;

//IF TIME TRY THESE:
//https://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite9.js
//

function preload() {
  loadJSON('assets/tiles.json', function(tile_frames) {
    tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet.png', tile_frames);
  });

  
}

class Player {
  render(x, y) {
    player = createSprite(x, y);
    player.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
    player.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  }
  movement() {
    player.velocity.y += GRAVITY;

    if (keyDown('UP') || keyDown('SPACE')) {
      if (player.collide(platforms) || player.position.y >= Level_H) {
        player.changeAnimation('stretch');
        player.animation.rewind();
        player.velocity.y = -JUMP;
        if (keyDown('UP') || keyDown('SPACE')) {
          player.changeAnimation('stretch');
          player.animation.rewind();
          player.velocity.y = -JUMP;
        }
      }
    } else if (player.collide(platforms) || player.position.y >= Level_H) {
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

    if (player.position.x < 35) {
      player.position.x = 35;
    }
    if (player.position.y < 0) {
      player.position.y = 0;
    }
    if (player.position.x > Level_W-55) {
      player.position.x = Level_W-55;
    }
  }
  decompose() {
  }
}

class Platform {
  render() {
    for (var i = 0; i < 100; i ++) {
      var y = Level_H - (i * 300);
      var x = (random(0, Level_W));

      platform = createSprite(x, y);
      platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');

      platforms.add(platform);
       /*else {
        platform = createSprite(x, y);
        platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
  
        //platform.setSpeed(v);
  
        platforms_moving.add(platform);
      }*/
  
    }
    //platform.life = 1*(10000-y) + 600;
  }

  /*moving() {
    if (platforms_moving.position.x < 0) {
      platforms_moving.position.x = 1;
      platform.velocity.x = abs(platforms_moving.velocity.x);
    }

    if (platforms_moving.position.x > Level_W) {
      platforms_moving.position.x = Level_W-1;
      platforms_moving.velocity.x = -abs(platform.velocity.x);
    }
  } */
}

class Map {
  DrawMap() {
    
    for (var x = -1000; x < -70; x += 70) {
      for (var y = 0; y < 12140; y += 70) {
        tile_sprite_sheet.drawFrame('stoneCenter.png', x, y);
      }
      for(var y = 0; y < 70; y += 70) {
        tile_sprite_sheet.drawFrame('stone.png', x, y); 
      }
    }

    for (var x = 800; x < 1800; x += 70) {
      for (var y = 0; y < 12140; y += 70) {
        tile_sprite_sheet.drawFrame('stoneCenter.png', x, y);
      }
      for(var y = 0; y < 70; y += 70) {
        tile_sprite_sheet.drawFrame('stone.png', x, y); 
      }
    }

    for (var x = -900; x < 1700; x += 70) {
      tile_sprite_sheet.drawFrame('stone.png', x, 10070);
      for (var y = 10140; y < 12140; y += 70) {
        tile_sprite_sheet.drawFrame('stoneCenter.png', x, y);
      }
    }
  }
}
  
let p = new Player();
let plat = new Platform();
let m = new Map();

function setup() {
  createCanvas(500,700);

  //200
  p.render(400,10000);

  platforms = new Group();
  platforms_moving = new Group();
  //collectibles = new Group();

  plat.render();

  camera.zoom = 0.5;
}

function draw() {
  clear();
  background(255,255,255);

  p.movement();
  m.DrawMap();

  //plat.moving();


  //console.log("PlayerXpos",player.position.x);
  //console.log("PlayerYpos",player.position.y);


  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  drawSprites();
}