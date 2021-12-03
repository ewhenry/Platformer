package Platformer;

//import java.util.ArrayList;
import processing.core.PApplet;
//import processing.core.PVector;

public class Main extends PApplet {

    public final static int WIDTH = 650;
    public final static int HEIGHT = 500;
    static int[][] level = new int[HEIGHT][WIDTH];

    Player p;
    
    Trampoline t;

    public void settings() {
		size(650, 500);
	  }

    public void setup() {
        print(RIGHT);
        rectMode(CENTER);
        p = new Player(this, WIDTH/2, HEIGHT/2);
        t = new Trampoline(this, width/2, height-15);
    }

    public void draw(){
      p.update();
		  background(0);

      drawLevel();
      p.Render();
      //p.checkEdges();
	  }

    void drawLevel() {
        fill(0);
        noStroke();
        for ( int ix = 0; ix < WIDTH; ix++ ) {
          for ( int iy = 0; iy < HEIGHT; iy++ ) {
            switch(level[iy][ix]) {
              case 1: rect(ix*16,iy*16,16,16);
            }
          }
        }
    }

    public static void main(String[] args){
        String[] processingArgs = {"Main"};
        Main Main = new Main();
        PApplet.runSketch(processingArgs, Main);
    }

    public void keyPressed() {
        switch(keyCode) {
            case RIGHT: Player.right = true; break;
            case LEFT: Player.left = true; break;
            case UP: Player.up = true; break;
          }
    }

    public void keyReleased() {
        switch(keyCode) {
            case RIGHT: Player.right = false; break;
            case LEFT: Player.left = false; break;
            case UP: Player.up = false; break;
        }
    }

    public static boolean place_free(int xx,int yy) {
        //checks if a given point (xx,yy) is free (no block at that point) or not
          yy = floor(yy/16);
          xx = floor(xx/16);
          if ( xx > -1 && xx < level[0].length && yy > -1 && yy < level.length ) {
            if ( level[yy][xx] == 0 ) {
              return true;
            }
          }
          return false;
    }
    
    public void mousePressed() {
        //Left click creates/destroys a block
          if ( mouseButton == LEFT ) {
            level[floor(mouseY/16)][floor(mouseX/16)] ^= 1;
          }
        }
}
