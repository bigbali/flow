import type Effect0 from ".";
import type { Vec } from "../type";

export default class Particle {
    ctx: CanvasRenderingContext2D;
    e: Effect0;
    history: Vec[] = [];
    lifetime: number;
    x: number;
    y: number;
    internalMultiplier: number;

    constructor(x: number, y: number, e: Effect0) {
        this.x = x;
        this.y = y;
        this.lifetime = Math.max(Math.floor(Math.random() * 50), 1);
        
        this.e = e;
        this.ctx = e.canvas.context;
        this.internalMultiplier = Math.random();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);

        this.ctx.fillStyle = 'red';
        this.ctx.fill();

        this.x =
            this.x +
            (Math.random() - 0.5) * this.internalMultiplier * this.e.settings.multiplier.value;
        this.y =
            this.y +
            (Math.random() - 0.5) * this.internalMultiplier * this.e.settings.multiplier.value;


        if (this.history.length > this.lifetime) {
            this.history.shift();
        }

        this.ctx.lineWidth = 3;

        let i = 0;
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