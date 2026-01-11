import type Effect2 from '.';
import type Canvas from '../canvas_up';
import type { Vec } from '../type';

// const colors = ['blue', '#cc1212', 'purple'];

const color = 'hsl(0, 83.78%, 43.53%)';
// const color = 'hsl(120, 100%, 25.1%)';
const fragments = color.replace('hsl(', '').replace(')', '').replace(/%/g, '').split(',');
const lightness = Number.parseFloat(fragments[2]);

const lightnesses = (() => {
    const t = [];

    t.push(lightness * 0.25)
    t.push(lightness * 0.5)
    t.push(lightness * 1.25)
    t.push(lightness * 1.75)

    return t;
})()

const colors = lightnesses.map((c) => color.replace(lightness.toString(), c.toString()));
colors.push(color);
// 
type RGB = {
    r: number,
    g: number,
    b: number
}

export default class Particle {
    ctx: CanvasRenderingContext2D;
    e: Effect2;
    history: Vec[];
    x: number;
    y: number;
    initialX: number;
    initialY: number;
    color: string;
    speed: number;
    tail: number;
    duration: number;
    i: number;
    iteration = 0;
    angle = 0;
    outOfBounds = false;

    constructor(e: Effect2, x: number, y: number, i: number) {
        this.e = e;
        this.ctx = e.canvas.context;

        this.initialX = x;
        this.initialY = y;
        this.x = this.initialX;
        this.y = this.initialY;
        this.i = i;

        this.tail = Math.max(Math.floor(Math.random() * 100), 10);
        this.duration = this.tail * 2;

        this.history = [{ x: this.x, y: this.y }];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.max(Math.random() * 3, 0.1);


    }

    draw() {
        this.iteration++;
        this.ctx.beginPath();
        this.ctx.moveTo(this.history[0].x, this.history[0].y);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.color;
    
        for (const h of this.history) {
            // don't render out of bounds particles
            if (this.e.canvas.isWithinBounds(h.x, h.y)) {
                this.ctx.lineTo(h.x, h.y);
            }
        }

        this.ctx.stroke();

        this.update();
    }

    update() {
        if (this.iteration < this.duration) {
            // optimize: move to constructor
            // const index =
            //     Math.floor(this.x / this.canvas.dx) * this.canvas.resolution.y +
            //     Math.floor(this.y / this.canvas.dy);

            // const index = this.x | 1 * this.y | 1
            this.angle = this.e.flowField[this.i];

            this.x += Math.cos(this.angle) * this.speed;

            // we get negative y values that rebound to positive, resulting in zig-zags at the top,
            // so we fix it this way
            if (!this.outOfBounds && this.y > 0) {
                this.y += Math.sin(this.angle) * this.speed;
            }

            if (this.y < 0) {
                this.outOfBounds = true;
            }

            if (this.history.length >= this.tail) {
                this.history.shift();
            }

            this.history.push({
                x: this.x,
                y: this.y
            });
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.x = this.initialX;
            this.y = this.initialY;
            
            this.history = [{x: this.x, y: this.y}]
            this.iteration = 0;
            this.outOfBounds = false;
        }
    }
}
