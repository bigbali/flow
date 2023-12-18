export default (ctx: CanvasRenderingContext2D, index: number, x: number, y: number) => {
    ctx.font = '16px monospace';
    ctx.fillStyle = 'white';

    ctx.fillText(index.toString(), x, y);
}