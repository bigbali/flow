import Canvas from './canvas_up';
import type { EffectId } from './type';

export const initializeCanvas = (e: EffectId): Canvas => {
    const POINTS_X = 1000;
    const POINTS_Y = 60;

    const canvas = document.querySelector('#canvas')! as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d')!;

    const overlay = document.querySelector('#overlay')! as HTMLCanvasElement;
    // const overlayCtx = overlay.getContext('2d')!;

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    canvas.width = width;
    canvas.height = height;
    overlay.width = width;
    overlay.height = height;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    overlay.style.width = window.innerWidth * window.devicePixelRatio + 'px';
    overlay.style.height = window.innerHeight + 'px';

    return new Canvas(canvas, e);
}

