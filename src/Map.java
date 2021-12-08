package src;

import processing.core.PApplet;

public class Map extends PApplet {

    public static final int WIDTH = 17;
    public static final int HEIGHT = 51;

    public static int[][] level = new int[HEIGHT][WIDTH];
    
    static void platform() {
        level[(floor(49.0f))][(floor(1.0f))] ^= 1;
        level[(floor(49.0f))][(floor(8.0f))] ^= 1;
        level[(floor(49.0f))][(floor(5.0f))] ^= 1;
        level[(floor(46.0f))][(floor(5.0f))] ^= 1;
        level[(floor(10.0f))][(floor(5.0f))] ^= 1;
        level[(floor(15.0f))][(floor(5.0f))] ^= 1;
        level[(floor(20.0f))][(floor(5.0f))] ^= 1;
        level[(floor(25.0f))][(floor(5.0f))] ^= 1;
    }
}
