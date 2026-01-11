import type Effect3 from ".";
import type { Vec } from "../type";
import { ParticleShape } from "./settings.store.svelte";

export default class ParticleTest {
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
        const data = this.e.rawData!.data;
        const width = this.e.rawData!.width!;

        const r = this.r;
        const g = this.g;
        const b = this.b;
        const a = this.a;

        for (let dy = 0; dy < this.size; dy++) {
            let rowIndex = ((this.y + dy) * width + this.x) * 4;

            for (let dx = 0; dx < this.size; dx++) {
                data[rowIndex]     = r;
                data[rowIndex + 1] = g;
                data[rowIndex + 2] = b;
                data[rowIndex + 3] = a;

                rowIndex += 4;
            }
        }
    }

    update() {
        this.x += Math.round((Math.random() - 0.5) * this.size);
        this.y += Math.round((Math.random() - 0.5) * this.size);
    }
}