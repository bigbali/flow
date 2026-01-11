import type Canvas from "$lib/canvas_up";
import type { Effect, Resolution } from "$lib/type";
import Particle from "./particle";
import { effect1State } from "./settings.store.svelte"; 

export default class Effect1 implements Effect {
    canvas: Canvas;
    particles: Particle[] = [];
    particleCount: number = 1000;
    colors: string[] = [];
    settings = effect1State;
    isRequestingNextFrame = true;

    constructor(c: Canvas) {
        this.canvas = c;
        this.initialize();
    }

    async initialize() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(
                new Particle(
                    Math.random() * this.canvas.canvas.width,
                    Math.random() * this.canvas.canvas.width,
                    this
                )
            );
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