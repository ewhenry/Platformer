package Platformer;

import processing.core.PApplet;
//import processing.core.PVector;

public class Player {

    private PApplet s;

    // CONSTS
    public final float MaxRun = 90f;
    public final float RunAccel = 1000f;
    private final float RunReduce = 400f;

    private final float JumpGraceTime = 0.1f;
    private final float JumpSpeed = -105f;
    
    public final float MaxFall = 160f;
    private final float Gravity = 900f;

    // VARS
    public static int x;
    public static int y;

    private static float RunSpeed;
    private static float FallSpeed;

    private static float xSave;
    private static float ySave;

    private static float xRep;
    private static float yRep;

    public static boolean right = false;
    public static boolean left = false;
    public static boolean up = false;

    Player(PApplet s, int x, int y) {
        this.s = s;
        this.x = x;
        this.y = y;

        RunSpeed = 0;
        xSave = 0;
        ySave = 0;
        xRep = 0;
        yRep = 0;
    }

    void update() {
        if ( right ) {
            RunSpeed += RunAccel;
            if ( RunSpeed > MaxRun ) {
                RunSpeed = MaxRun;
            }
        }

        else if ( left ) {
            RunSpeed -= RunAccel;
            if ( RunSpeed < -MaxRun ) {
                RunSpeed = -MaxRun;
            }
        }

        else {
            if ( RunSpeed > 0 ) {
                RunSpeed -= RunAccel;
                if ( RunSpeed < 0 ) {
                    RunSpeed = 0;
                }
            }
            else if ( RunSpeed < 0 ) {
                RunSpeed += RunAccel;
                if ( RunSpeed > 0 ) {
                    RunSpeed = 0;
                }
            }
        }

        /*if ( UP ) {
            if ( !place_free(x,y+16) || !place_free(x+15,y+16) ) {
              FallSpeed = -5.3;
            }
          }
        */

    FallSpeed += Gravity;

    xRep = 0; 
    yRep = 0;
    xRep += PApplet.floor(PApplet.abs(RunSpeed));
    yRep += PApplet.floor(PApplet.abs(FallSpeed));
    xSave += PApplet.abs(RunSpeed)-PApplet.floor(PApplet.abs(RunSpeed));
    ySave += PApplet.abs(FallSpeed)-PApplet.floor(PApplet.abs(FallSpeed));
    int signX = (RunSpeed<0) ? -1 : 1;
    int signY = (FallSpeed<0) ? -1 : 1;
    //when the player is moving a direction collision is tested for only in that direction
    //the offset variables are used for this in the for loops below
    int offsetX = (RunSpeed<0) ? 0 : 15;
    int offsetY = (FallSpeed<0) ? 0 : 15;
    
    if ( xSave >= 1 ) {
      xSave -= 1;
      xRep++;
    }
    if ( ySave >= 1 ) {
      ySave -= 1;
      yRep++;
    }
    
    for ( ; yRep > 0; yRep-- ) {
      if ( Main.place_free(x,y+offsetY+signY) && Main.place_free(x+15,y+offsetY+signY) ) {
        y += signY;
      }
      else {
        FallSpeed = 0;
      }
    }
    for ( ; xRep > 0; xRep-- ) {
      if ( Main.place_free(x+offsetX+signX,y) && Main.place_free(x+offsetX+signX,y+15) ) {
        x += signX;
      }
      else {
        RunSpeed = 0;
      }
    }
      
  }

    void Render() {
        s.pushMatrix();
        s.stroke(145);
        s.strokeWeight(1);
        s.fill(255, 200);
        s.ellipse(x, y, 20, 20);
        s.popMatrix();
    }
}
