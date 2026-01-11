export type Effect3State = {
    samplingSize: {
        min: number;
        max: number;
        value: number;
    };
    particleShape: ParticleShape;
};

export enum ParticleShape {
    SQUARE = 'square',
    CIRCLE = 'circle',
    STAR = 'star'
}

export const effect3State = $state<Effect3State>({
    samplingSize: {
        min: 1,
        max: 50,
        value: 10
    },
    particleShape: ParticleShape.SQUARE
});
