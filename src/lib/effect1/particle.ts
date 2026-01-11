import type Effect1 from ".";
import type Canvas from "../canvas_up";
import type { Vec } from "../type";

export default class Particle {
    ctx: CanvasRenderingContext2D;
    e: Effect1;
    history: Vec[];
    lifetime: number;
    x: number;
    y: number;
    angle: number;

    constructor(x: number, y: number, e: Effect1) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.lifetime = Math.max(Math.floor(Math.random() * 10), 1);
        this.history = [];

        this.e = e;
        this.ctx = e.canvas.context;

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.x,
            this.y,
            3,
            0,
            2 * Math.PI
        );

        this.ctx.fillStyle = 'red';
        this.ctx.fill();

        this.x += Math.sin(this.angle) * this.e.settings.multiplier.value;
        this.y += Math.cos(this.angle) * this.e.settings.multiplier.value;

        this.angle += 0.5;

        if (this.history.length > this.lifetime) {
            this.history.shift();
        }

        this.ctx.lineWidth = 3;

        let i = 1;
        for (const memory of this.history) {
            this.ctx.strokeStyle =
                this.e.colors[
                    this.history.length > 1
                        ? Math.floor((i * (this.e.colors.length - 1)) / (this.history.length - 1))
                        : this.e.colors.length - 1
                ];

            this.ctx.beginPath();
            this.ctx.moveTo(memory.x, memory.y);
            this.ctx.lineTo(this.x, this.y);
            this.ctx.stroke();

            i++;
        }

        this.history.push({
            x: this.x,
            y: this.y
        });
    }
}