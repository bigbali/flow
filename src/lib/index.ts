import Canvas from './canvas';
import drawYNumbering from './numbering';
import type { Vec } from './type';

const POINTS_X = 1000;
const POINTS_Y = 60;

const canvas = document.querySelector('#canvas')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const overlay = document.querySelector('#overlay')! as HTMLCanvasElement;
const overlayCtx = overlay.getContext('2d')!;

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

console.log(window.devicePixelRatio)

const c = new Canvas(canvas);

const r = () => requestAnimationFrame(() => {
    c.render();

    setTimeout(r, 16.67);
});

r()

const dx = (width / POINTS_X) + (width / POINTS_X) / POINTS_X;
const dy = height / POINTS_Y + (height / POINTS_Y) / POINTS_Y;

const lines: { from: Vec; to: Vec }[][] = Array(POINTS_Y);

// let starts: Vec[] = new Array(POINTS_Y);
// for (let x = 0; x < POINTS_X; x++) {
//     if (x === 0) {
//         for (let y = 0; y < POINTS_Y; y++) {
//             starts[y] = {
//                 x: x * dx,
//                 y: y * dy
//             };
//         }
//     }

//     for (let y = 0; y < POINTS_Y; y++) {
//         const from: Vec = {
//             x: x * dx,
//             y: y * dy
//         };

//         if (x > 0) {
//             from.x = starts[y].x;
//             from.y = starts[y].y;
//         }

//         const to: Vec = {
//             // x: from.x + dx,
//             x: from.x + dx + (Math.random() - 0.5) * 10,
//             y: from.y + (Math.random() - 0.5) * 10
//         };

//         starts[y] = {
//             x: to.x,
//             y: to.y
//         };

//         if (!lines[y]) lines[y] = [];
//         lines[y].push({from, to});

//         // const mx = Math.random();
//         // const my = Math.random();

//         // ctx.beginPath();
//         // ctx.strokeStyle = 'red';
//         // ctx.moveTo(position_x + dx / 2,  position_y + dy / 2);
//         // ctx.lineTo(dx / 2 + 15 * mx + position_x, dx / 2 + 15 * my + position_y);
//         // ctx.stroke();

//         // ctx.beginPath();
//         // ctx.strokeStyle = 'red';
//         // ctx.moveTo(from.x,  from.y);
//         // ctx.lineTo(to.x, to.y);
//         // ctx.lineWidth = 3;
//         // ctx.stroke();
//     }
// }

// const draw = (x = 0) => {
//     // if (expanse > 10) return;

//     const center_y = lines.length / 2 - 1;
//     const center_x = lines[0].length / 2 - 1;
    
//     for (let i = 0; i < lines.length; i++) {
//     // for (let i = center_y - 5; i < center_y + 5; i++) {
//         const line = lines[i];

//         ctx.strokeStyle = 'red';
//         ctx.lineWidth = 3;



//         if (x === 0) {
//             drawYNumbering(overlayCtx, i, line[center_x].from.x, line[center_x].from.y);

//             ctx.beginPath();
//             ctx.moveTo(line[center_x].from.x, line[center_x].from.y);
//             ctx.lineTo(line[center_x].to.x, line[center_x].to.y);
//             ctx.stroke();
//         } else {
//             const left = line[center_x - x];
//             const right = line[center_x + x];

//             if (left) {
//                 ctx.beginPath();
//                 ctx.moveTo(left.from.x,  left.from.y);
//                 ctx.lineTo(left.to.x, left.to.y);
//                 ctx.stroke();
//             }

//             if (right) {
//                 ctx.beginPath();
//                 ctx.moveTo(right.from.x, right.from.y);
//                 ctx.lineTo(right.to.x, right.to.y);
//                 ctx.stroke();
//             }
//         }
//     }

//     setTimeout(() => draw(x + 1), 16)
// }

// draw();

export default {};