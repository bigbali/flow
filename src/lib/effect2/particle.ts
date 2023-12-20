import type Canvas from '../canvas';
import type { Vec } from '../type';

const colors = ['red', 'pink', 'purple', 'blue'];

export default class Particle {
    canvas: Canvas;
    history: Vec[];
    tail: number;
    // duration: number;
    iteration = 0;
    x: number;
    y: number;
    angle: number;
    color: string;

    constructor(canvas: Canvas) {
        this.canvas = canvas;

        this.x = Math.floor(Math.random() * canvas.canvas.width);
        this.y = Math.floor(Math.random() * canvas.canvas.height);
        this.angle = 0;
        this.tail = Math.max(Math.floor(Math.random() * 100), 10);
        // this.duration = Math.max(Math.floor(Math.random() * 1000), 100);
        this.history = [{ x: this.x, y: this.y }];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        const index =
            Math.floor(this.x / this.canvas.dx) * this.canvas.resolution.y +
            Math.floor(this.y / this.canvas.dy);
        this.angle = this.canvas.flowField[index];

        this.canvas.context.beginPath();
        this.canvas.context.arc(this.x, this.y, 5, 0, 2 * Math.PI);

        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fill();

        this.canvas.context.beginPath();
        this.canvas.context.moveTo(this.history[0].x, this.history[0].y);
        this.canvas.context.lineWidth = 3;
        this.canvas.context.strokeStyle = this.color;

        for (const h of this.history) {
            this.canvas.context.lineTo(h.x, h.y);
        }

        this.canvas.context.stroke();

        this.x += Math.cos(this.angle);
        this.y += Math.sin(this.angle);

        if (this.history.length >= this.tail) {
            this.history.shift();
        }

        this.history.push({
            x: this.x,
            y: this.y
        });
    }
}
