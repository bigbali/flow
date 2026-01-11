export type Vec = {
    x: number,
    y: number
}

export type Resolution = {
    x: number,
    y: number
}

export type ParticleType = {
    draw: () => void
}

export interface Effect {
    name?: EffectType,
    initialize: (context: CanvasRenderingContext2D) => Promise<any>,
    draw: () => void,
    updateFrequency?: number,
    isRequestingNextFrame?: boolean
}

export enum EffectType {
    EFFECT1 = 'Effect 1',
    CIRCLES = 'Circles',
    FLOWFIELD = 'Flowfield',
    PIXELS = 'Pixels'
}

export type EffectId = "effect0" | "effect1" | "effect2" | "effect3";