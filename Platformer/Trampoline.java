package Platformer;

import processing.core.PApplet;

public class Trampoline {

    private PApplet s;

    protected float x, y, mass, height, width;

    Trampoline(PApplet s, float x, float y) {
        this.s = s;
        this.x = x;
        this.y = y;
        mass = 20;
        height = 1.5f*mass;
        width = 4*mass;
    }

    void Render() {
        s.fill(255,0,0);
        s.stroke(0);
        s.strokeWeight(0);
        s.rect(x, y, width, height);
    }
}
