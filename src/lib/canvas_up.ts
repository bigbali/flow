// import Particle from './effect1/particle';
import type { Effect, EffectId, Resolution } from './type';
import Effect0 from './effect0';
import Effect1 from './effect1';
import Effect2 from './effect2';
import Effect3 from './effect3';
import { createContext } from 'svelte';
import { writable } from 'svelte/store';

// export const [getCanvasContext, setCanvasContext] = createContext<Canvas>();
export const canvasStore = writable<Canvas | null>(null);

export default class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    effect: Effect;
    updateLoopHandle?: number;
    isReady = false;

    constructor(canvas: HTMLCanvasElement, e: EffectId) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;

        this.effect = (() => {
            if (e === 'effect0') {
                return new Effect0(this);
            } else if (e === 'effect1') {
                return new Effect1(this);
            } else if (e === 'effect2') {
                return new Effect2(this);
            } else if (e === 'effect3') {
                return new Effect3(this);
            } else {
                return new Effect0(this);
            }
        })();
    }

    async initialize() {
        this.isReady = false;

        this.context.fillStyle = 'red';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        await this.effect.initialize(this.context);

        this.isReady = true;

        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update = () => {
        requestAnimationFrame(() => {
            this.draw();
        });

        return true;
    };

    draw() {
        this.effect.draw();
    }

    beginRenderLoop() {
        console.log(`Beginning render loop for effect '${this.effect.name ?? '<unnamed>.'}'`);

        this.update();

        if (this.updateLoopHandle) {
            this.endRenderLoop();
            this.updateLoopHandle = undefined;
        }

        if (!this.effect.isRequestingNextFrame) {
            console.log(`Next frame not requested, returning.`);
            return;
        }

        const fn = () => {
            this.updateLoopHandle = setTimeout(
                () => {
                    console.log('fn');
                    if (this.update()) {
                        fn();
                    }
                },
                1000 / (this.effect.updateFrequency || 60)
            );
        };

        fn();
    }

    endRenderLoop() {
        clearTimeout(this.updateLoopHandle);
    }

    isWithinBounds(x: number, y: number) {
        return x < this.canvas.width && x > 0 && y < this.canvas.height && y > 0;
    }
}
