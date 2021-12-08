package src;

import processing.core.PApplet;

public class Main extends PApplet {
    public void settings() {
        size(270, 825);
    }

    public void setup() {
        noStroke();
        background(250);
        p = new Player(10, 750);

        Map.platform();
    }

    float i = 0;

    Player p;
    Map m;

    public void draw() {
        background(250);
        p.update();
        display();
        drawLevel();
        
        fill(220);
    }

    void display() {
        pushStyle();
        rectMode(CORNER);
        fill(250, 150, 0);
        smooth();
        rect(Player.x, Player.y, 16, 16, 70, 70, 70, 70);
        popStyle();
    }

    void drawLevel() {
        fill(0);
        noStroke();
        for ( int ix = 0; ix < Map.WIDTH; ix++ ) {
            for ( int iy = 0; iy < Map.HEIGHT; iy++ ) {
                switch(Map.level[iy][ix]) {
                case 1: 
                    rect(ix*16, iy*16, 16, 8);
                }
            }
        }
    }

    public void keyPressed() {
        switch(keyCode) {
            case RIGHT: 
                p.right = true; 
                break;
            case LEFT: 
                p.left = true; 
                break;
            case UP: 
                p.up = true; 
                break;
        }
    }  

    public void keyReleased() {
        switch(keyCode) {
            case RIGHT: 
                p.right = false; 
                break;
            case LEFT: 
                p.left = false; 
                break;
            case UP: 
                p.up = false; 
                break;
        }
    }

    public static void main(String[] args){
        String[] processingArgs = {"Main"};
        Main Main = new Main();
        PApplet.runSketch(processingArgs, Main);
    }

}
