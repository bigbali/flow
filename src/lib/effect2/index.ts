import type Canvas from "$lib/canvas_up";
import type { Effect, Resolution } from "$lib/type";
import Particle from "./particle";
import { effect2State } from "./settings.store.svelte"; 

export default class Effect2 implements Effect {
    canvas: Canvas;
    resolution: Resolution;
    particles: Particle[] = [];
    particleCount: number = 1000;
    flowField: number[] = [];
    curve = Math.PI;
    zoom = 0.1;
    colors: string[] = [];
    settings = effect2State;
    isRequestingNextFrame = true;

    constructor(c: Canvas) {
        this.canvas = c;
        this.resolution = {
            x: Math.floor(window.innerWidth / 20),
            y: Math.floor(window.innerHeight / 20)
        };
    }

    async initialize() {
        // for (let x = 0; x < this.resolution.x; x++) {
        //     for (let y = 0; y < this.resolution.y; y++) {
        //         // const _x = Math.floor(x * this.dx);
        //         // const _y = Math.floor(y * this.dy);

        //         col.push(Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve);
        //         // this.flowField.push(Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve);
        //     }

        //     this.flowField.push(col);
        // }

        for (let i = 0; i < this.particleCount; i++) {
            let x = Math.random() * this.canvas.canvas.width;
            let y = Math.random() * this.canvas.canvas.height;

            this.flowField.push(Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve);

            this.particles.push(new Particle(this, x, y, i));
        }

        this.colors = Array.from({ length: 32 }, (_, i) => {
            const t = i / 31;
            const g = (150 - t * 150) | 0;
            return `rgb(213, ${g + 50}, ${g + 50})`;
        });
    }

    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);

        for (const particle of this.particles) {
            particle.draw();
        }
    }
}