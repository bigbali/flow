import type Canvas from "../canvas";
import type { Vec } from "../type";

export default class Particle {
    canvas: Canvas;
    history: Vec[];
    lifetime: number;
    x: number;
    y: number;
    angle: number;

    constructor(x: number, y: number, canvas: Canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.angle = Math.sin(x) * Math.cos(y);
        this.lifetime = Math.max(Math.floor(Math.random() * 50), 1);
        this.history = [];
    }

    draw() {
        this.canvas.context.beginPath();
        this.canvas.context.arc(this.canvas.dx * this.x, this.canvas.dy * this.y, 3, 0, 2 * Math.PI);

        this.canvas.context.fillStyle = 'red';
        this.canvas.context.fill();

        this.x = this.x + (Math.random() - 0.5) * 0.3;
        this.y = this.y + (Math.random() - 0.5) * 0.3;


        if (this.history.length > this.lifetime) {
            this.history.shift();
        }

        let i = 1;
        for (const memory of this.history) {
            i++;

            this.canvas.context.strokeStyle = `rgb(255, ${(i / this.history.length) * 255}, ${
                255 - (i / this.history.length) * 255
            })`;
            this.canvas.context.lineWidth = 3;

            this.canvas.context.beginPath();
            this.canvas.context.moveTo(this.canvas.dx * memory.x, this.canvas.dy * memory.y);
            this.canvas.context.lineTo(this.canvas.dx * this.x, this.canvas.dy * this.y);
            this.canvas.context.stroke();
        }

        this.history.push({
            x: this.x,
            y: this.y
        });
    }
}