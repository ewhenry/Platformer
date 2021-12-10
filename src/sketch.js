var GRAVITY = 1.55;
var JUMP = 25;

var Level_W = 800;
var Level_H = 10000;

var player, ground, platform;

var face;

var playerImg, BGImg, platfromImg, groundImg;

var Jumps = 0;

function preload() {
  loadJSON('assets/tiles.json', function(tile_frames) {
    tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet.png', tile_frames);
  });

  face = loadImage('assets/face.png');
  
}

class Player {
  render(x, y) {
    player = createSprite(x, y);

    player.draw = function() {
      fill(255,100,0);

      push();
      rotate(radians(this.getDirection()));
      ellipse(0,0,100+this.getSpeed(), 100-this.getSpeed());
      pop();

      image(face, this.deltaX*2, this.deltaY*2);
    }

    player.maxSpeed = 25;
  }

  movement() {
    player.velocity.y += GRAVITY;

    if (player.collide(platforms) || player.position.y > Level_H) {
      Jumps = 0;
      player.velocity.y = 0;
    }
    if (keyWentDown('UP') || keyWentDown('SPACE')) {
      if (Jumps < 2) {
        Jumps += 1;
        player.velocity.y = -JUMP;
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
    if (player.position.y > Level_H) {
      player.position.y = Level_H+20;
    }
    if (player.position.x > Level_W-55) {
      player.position.x = Level_W-55;
    }
  }
}

class Platform {
  render() {
    for (var i = 1; i < 60; i ++) {
      var y = Level_H - (i * 300);
      var x = (random(0, Level_W));

      platform = createSprite(x, y);
      platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');

      platform.setCollider('rectangle', 0, -30, 200, 0);
      //platform.life = i*90;

      platform.debug = true;
      

      platforms.add(platform);
       /*else {
        platform = createSprite(x, y);
        platform.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
  
        //platform.setSpeed(v);
  
        platforms_moving.add(platform);
      }*/
  
    }
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

  p.render(400,10000);

  platforms = new Group();

  plat.render();

  camera.zoom = 0.5;
}

function draw() {
  clear();
  background(255,255,255);

  p.movement();
  m.DrawMap();


  //console.log("PlayerXpos",player.position.x);
  console.log("PlayerYpos",player.velocity.y);


  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  player.debug = keyDown('D');

  drawSprites();
}