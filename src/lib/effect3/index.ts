import type Canvas from '$lib/canvas_up';
import { EffectType, type Effect, type Resolution } from '$lib/type';
import ParticleTest from './particle.1';
import { effect3State } from './settings.store.svelte';
import img from './image/IMG_9582.jpg';

export default class Effect3 implements Effect {
    name? = EffectType.PIXELS;
    canvas: Canvas;
    // particles: Particle[] = [];
    particles: ParticleTest[] = [];
    particleCount: number = 1000;
    colors: string[] = [];
    settings = effect3State;
    imageBuffer?: Awaited<ReturnType<typeof loadImageBuffer>>;
    isRequestingNextFrame = false;
    initialized = false;

    constructor(c: Canvas) {
        this.canvas = c;
    }

    rawData: ImageData | null = null;

    async initialize() {
        this.initialized = false;
        this.particles = [];

        if (!this.imageBuffer) {
            this.imageBuffer = await loadImageBuffer(img, this.canvas);
        }

        let { width, height, data } = this.imageBuffer;

                this.canvas.context.fillStyle = 'red';
                this.canvas.context.fillRect(
                    0,
                    0,
                    this.canvas.canvas.width,
                    this.canvas.canvas.height
                );


        const groupBy = this.settings.samplingSize.value;

        this.rawData = this.canvas.context.createImageData(width, height);

        let m = 0;
        for (let y = groupBy / 2; y < height; y += groupBy) {            
            for (let x = groupBy / 2; x < width; x += groupBy) {
                let ar = 0;
                let ag = 0;
                let ab = 0;
                let aa = 0;

                for (let a = y - groupBy / 2; a < y + groupBy / 2; a++) {
                    for (let b = x - groupBy / 2; b < x + groupBy / 2; b++) {
                        const i = (a * width + b) * 4;

                        const _r = data[i];
                        const _g = data[i + 1];
                        const _b = data[i + 2];
                        const _a = data[i + 3];

                        ar += _r;
                        ag += _g;
                        ab += _b;
                        aa += _a;
                    }
                }

                ar = ar / (groupBy * groupBy);
                ag = ag / (groupBy * groupBy);
                ab = ab / (groupBy * groupBy);
                aa = aa / (groupBy * groupBy);

                this.particles.push(new ParticleTest(x + groupBy / 2, y + groupBy / 2, groupBy, ar, ag, ab, aa, this));

                // for (let a = y - groupBy / 2; a < y + groupBy / 2; a++) {
                //     for (let b = x - groupBy / 2; b < x + groupBy / 2; b++) {
                //         const i = (a * width + b) * 4;

                //         this.rawData.data[i] = ar;
                //         this.rawData.data[i + 1] = ag;
                //         this.rawData.data[i + 2] = ab;
                //         this.rawData.data[i + 3] = aa;
                //     }
                // }
            }
        }

        this.initialized = true;
    }

    draw() {
        this.canvas.context.fillStyle = 'black';
        this.canvas.context.fillRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);

        
        for (const particle of this.particles) {
            particle.draw();
            particle.update();
        }

        this.canvas.context.putImageData(this.rawData!, 0, 0);
    }

    toggleRequestNextFrame() {
        this.isRequestingNextFrame = !this.isRequestingNextFrame;

        return this.isRequestingNextFrame;
    }
}

export async function loadImageBuffer(src: string, c: Canvas) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    await img.decode();

    const canvas = new OffscreenCanvas(c.canvas.width, c.canvas.height);
    const ctx = canvas.getContext('2d')!;

    const cw = canvas.width;
    const ch = canvas.height;

    const scale = Math.min(cw / img.width, ch / img.height);

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    const dx = (cw - drawWidth) / 2;
    const dy = (ch - drawHeight) / 2;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);

    return {
        width: img.width,
        height: img.height,
        data: imageData.data
    };
}