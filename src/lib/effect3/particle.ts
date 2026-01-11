import type Effect3 from ".";
import type { Vec } from "../type";
import { ParticleShape } from "./settings.store.svelte";

export default class Particle {
    ctx: CanvasRenderingContext2D;
    e: Effect3;
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
    a: number;
    size: number;

    constructor(x: number, y: number, size: number, r: number, g: number, b: number, a: number, e: Effect3) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.size = size;
        
        this.e = e;
        this.ctx = e.canvas.context;
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;

        if (this.e.settings.particleShape === ParticleShape.SQUARE) {
            this.ctx.fillRect(this.x, this.y, this.size, this.size);
        } else if (this.e.settings.particleShape === ParticleShape.CIRCLE) {
            this.ctx.beginPath();
            this.ctx.ellipse(
                this.x + this.size / 2,
                this.y + this.size / 2,
                this.size / 2,
                this.size / 2,
                0,
                0,
                360
            );
            this.ctx.fill();
        } else if (this.e.settings.particleShape === ParticleShape.STAR) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y + this.size);
            for (let i = 0; i < 2 * 5 + 1; i++) {
                const r = i % 2 == 0 
                    ? this.size 
                    : this.size / 2;
                const a = (Math.PI * i) / 5;
                this.ctx.lineTo(this.x + r * Math.sin(a), this.y + r * Math.cos(a));
            }
            this.ctx.closePath();
            this.ctx.fill();

        } else {
            throw Error(`Unknown shape selected: ${this.e.settings.particleShape}`);
        }
    }
}