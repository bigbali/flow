import Particle from './effect2/particle';
import type { Resolution } from './type';

export default class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    particles: Particle[];
    resolution: Resolution = {
        x: Math.floor(window.innerWidth / 20),
        y: Math.floor(window.innerHeight / 20)
    };
    particleCount =
        ((window.innerWidth / 10) * window.innerHeight / 10)  / (window.devicePixelRatio * 5);
    dx: number;
    dy: number;
    flowField: number[];
    curve = Math.PI;
    zoom = 0.1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.particles = [];
        this.flowField = [];

        this.dx =
            this.canvas.width / this.resolution.x +
            this.canvas.width / this.resolution.x / this.resolution.x;

        this.dy =
            this.canvas.height / this.resolution.y +
            this.canvas.height / this.resolution.y / this.resolution.y;

        this.initialize();

        window.particles = this.particles;
        window.flowField = this.flowField;
    }

    initialize() {
        for (let x = 0; x < this.resolution.x; x++) {
            for (let y = 0; y < this.resolution.y; y++) {
                this.flowField.push(
                    (Math.cos(y * this.zoom) + Math.sin(x * this.zoom)) * this.curve
                );
            }
        }

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            particle.draw();
        }
    }
}
