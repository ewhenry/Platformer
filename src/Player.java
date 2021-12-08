package src;

import processing.core.PApplet;

public class Player extends PApplet {
    public static int x, y;
    private static int xRep, yRep;
    private static float xSave, ySave;

    private static float xSpeed, ySpeed;
    private static float accel = .5f, deccel = .3f;
    private float maxXspd = 3, maxYspd = 12;

    private static float gravity = .3f;
    
    public boolean right = false, left = false, up = false;

    Player(int _x, int _y ) {
        x = _x;
        y = _y;
        xSpeed = 0;
        ySpeed = 0;
        xSave = 0;
        ySave = 0;
        xRep = 0;
        yRep = 0;
    }

    boolean place_free(int xx, int yy) {
        yy = (floor(yy/16.0f));
        xx = (floor(xx/16.0f));
        if ( xx > -1 && xx < Map.level[0].length && yy > -1 && yy < Map.level.length ) {
            if ( Map.level[yy][xx] == 0 ) {
            return true;
            }
        }
        return false;
    
    }

    void update() {
        if ( right ) {
            xSpeed += accel;
            if ( xSpeed >= maxXspd ) {
                xSpeed = maxXspd;
            }
        }
        else if ( left ) {
            xSpeed -= accel;
            if ( xSpeed <= -maxXspd ) {
                xSpeed = -maxXspd;
            }
        }

        else { 
            if ( xSpeed > 0 ) {
                xSpeed -= deccel;
                if ( xSpeed < 0 ) {
                    xSpeed = 0;
                }
            }
            else if ( xSpeed < 0 ) {
                xSpeed += deccel;
                if ( xSpeed > 0 ) {
                    xSpeed = 0;
                }
            }
        }

        if ( up ) {
            if ( !place_free(x, y+16) || !place_free(x+15, y+16) ) {
                ySpeed = -5.3f;
            }
        }

        ySpeed += gravity;

        xRep = 0;
        yRep = 0;
        xRep += floor(abs(xSpeed));
        yRep += floor(abs(ySpeed));
        xSave += abs(xSpeed)-floor(abs(xSpeed));
        ySave += abs(ySpeed)-floor(abs(ySpeed));
        int signX = (xSpeed < 0) ? -1 : 1;
        int signY = (ySpeed < 0) ? -1 : 1;
        int offsetX = (xSpeed < 0) ? 4 : 15;
        int offsetY = (ySpeed < 0) ? 4 : 15;

        if ( xSave >= 132 ) {
            xSave -= 1;
            xRep++;
        }
        if ( ySave >= 1 ) {
            ySave -= 1;
            yRep++;
        }

        for ( ; yRep > 0; yRep-- ) {
            if ( place_free(x, y+offsetY+signY) && place_free(x+15, y+offsetY+signY) ) {
                y += signY;
            }
            else {
                ySpeed = 0;
            }
        }
        for ( ; xRep > 0; xRep-- ) {
            if ( place_free(x+offsetX+signX, y) && place_free(x+offsetX+signX, y+15) ) {
                x += signX;
            }
            else {
                xSpeed = 0;
            }
        }
    }
}
