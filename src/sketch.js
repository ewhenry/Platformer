/*
Henry Wandover hw9692@bard.edu 
October 6th, 2021 
CMSC 141 
I worked on the final project alone, with assistance from p5.js and p5.play reference pages.

A platformer with the goal to reach the top as fast as possible.
*/


var GRAVITY = 1.55;
var JUMP = 30;

var Level_W = 800;
var Level_H = 10000;

var player, map, face, ground, Finish_Line, platform = [], finishLine, platform_hitbox = [], platform_hitboxes, Finished = false;

var playerImg, BGImg, platfromImg, groundImg, You_Win_IMG;

var Jumps = 0, timerValue = 0;

function preload() {
  loadJSON('assets/tiles.json', function(tile_frames) {
    tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet.png', tile_frames);
  });

  face = loadImage('assets/face.png');
  Finish_Line_IMG = loadImage('assets/finishLine.png');
  You_Win_IMG = loadImage('assets/You_Win!.png');
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
  }

  movement() {
    player.velocity.y += GRAVITY;

    if (player.velocity.y > 20) {
      player.velocity.y = 20;
    }

    if (player.collide(platforms)) {
      player.velocity.y = 0;
    }

    if (player.collide(platform_hitboxes) || player.position.y > Level_H) {
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

class Objects {
  Platform_render() {
    for (var i = 1; i < 32; ++i) {
      var y = Level_H - (i * 300);
      var x = (random(0, Level_W));
      var m = (random(0,1));

      platform[i] = createSprite(x, y);
      platform[i].addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
      platform_hitbox[i] = createSprite(x, y);
      platform_hitbox[i].addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');
      
      platform[i].velocity.x = 10;
      platform_hitbox[i].velocity.x = 10;

      platform[i].setCollider('rectangle', 0, 1, 200, 70);
      platform_hitbox[i].setCollider('rectangle', 0, -35, 200, 0);

      platforms.add(platform[i]);
      platform_hitboxes.add(platform_hitbox[i]);
    }
  }

  CheckEdges() {
    for (var i = 1; i < 32; ++i) { 
      if (platform[i].position.x > Level_W) {
        platform[i].velocity.x = -10;
        platform_hitbox[i].velocity.x = -10;
      }
      if (platform[i].position.x < 0) {
        platform[i].velocity.x = 10;
        platform_hitbox[i].velocity.x = 10;
      }
    }
  }

  Finish_Line_render() {
    Finish_Line = createSprite(400, 150);
    Finish_Line.addImage('normal', Finish_Line_IMG);
    Finish_Line.addImage('won', You_Win_IMG);
  }

  Finish_Line_Interact(player) {
    if (player.collide(Finish_Line)) {
      Finished = true;
      Finish_Line.changeImage('won');
    }
  }
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
let obj = new Objects();
let m = new Map();

function setup() {
  createCanvas(500,700);
  textAlign(CENTER);
  textSize(20);
  frameRate(60);

  setInterval(timeIt, 1000);

  obj.Finish_Line_render();

  p.render(400, 10000);

  platforms = new Group();
  platform_hitboxes = new Group();

  obj.Platform_render();

  camera.zoom = 0.5;
}


function draw() {
  clear();
  background(90,180,255);


  obj.Finish_Line_Interact(player);
  obj.CheckEdges();

  p.movement();
  
  //console.log("PlayerXpos", platforms);
  //console.log("PlayerYpos",player.velocity.y);


  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  player.debug = keyDown('D');

  drawSprites();

  m.DrawMap();
  
  push();
  fill(255, 140);
  text(timerValue, player.position.x, player.position.y-20);
  pop();
}

function timeIt() {
  if (Finished == false) {
    if (timerValue >= 0) {
      timerValue++;
    }
  }
}