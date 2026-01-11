// // import Particle from './effect1/particle';
// import Particle from './effect0/particle';
// import type { Resolution } from './type';

// export default class Canvas {
//     canvas: HTMLCanvasElement;
//     context: CanvasRenderingContext2D;
//     // @ts-ignore
//     particles: Particle[];
//     resolution: Resolution = {
//         x: Math.floor(window.innerWidth / 20),
//         y: Math.floor(window.innerHeight / 20)
//         // x: 128,
//         // y: 63
//     };
//     // particleCount =
//     //     ((window.innerWidth / 10) * window.innerHeight) / 10 / (window.devicePixelRatio * 10);
//     particleCount =2000
//     dx: number;
//     dy: number;
//     flowField: number[];
//     curve = Math.PI;
//     zoom = 0.1;
//     buffer: ImageData;

//     constructor(canvas: HTMLCanvasElement, e: string) {
//         this.canvas = canvas;
//         this.context = canvas.getContext('2d')!;
//         this.particles = [];
//         this.flowField = [];

//         this.dx =
//             this.canvas.width / this.resolution.x +
//             this.canvas.width / this.resolution.x / this.resolution.x;

//         this.dy =
//             this.canvas.height / this.resolution.y +
//             this.canvas.height / this.resolution.y / this.resolution.y;

//         this.context.font = '400px serif';
//         this.context.textAlign = 'center';
//         this.context.textBaseline = 'middle';
//         this.context.fillStyle = 'white';
//         this.context.fillText('b', this.canvas.width / 2, this.canvas.height / 2);

//         this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

//         this.initialize(e);

//         // @ts-ignore
//         window.particles = this.particles;
//         // @ts-ignore
//         window.flowField = this.flowField;

//         window.addEventListener('click', (e) => {
//             //  this.zoom -= 0.01;

//             //  this.flowField = [];
//             //  this.particles = [];

//             //  this.initialize();

//             // potential candidate for scoll on website?
//             for (let i = 0; i < this.flowField.length; i++) {
//                 this.flowField[i] = Math.PI / 2 * -1;
//             }
//         });
//     }

//     async initialize(e: string) {
//         for (let x = 0; x < this.resolution.x; x++) {
//             for (let y = 0; y < this.resolution.y; y++) {
//                 // this.flowField.push(
//                 //     // (Math.cos(y * this.zoom) + Math.sin(x * this.zoom)) * this.curve
//                 //     Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve
//                 // );

//                 const _x = Math.floor(x * this.dx);
//                 const _y = Math.floor(y * this.dy);

//                 const index = Math.floor(_y * this.canvas.width + _x) * 4;

//                 // this.flowField.push(
//                 //     Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve +
//                 //         (this.buffer.data[index]  * Math.PI)

//                 // );


//                 // with letter
//                 // this.flowField.push(
//                 //     this.buffer.data[index] === 0
//                 //         ? Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve
//                 //         : Math.PI / 2
//                 // );

//                 this.flowField.push(Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve);

//                 // todo save position of white pixels and iterate over them separately, drawing separate particles
//             }
//         }

//         console.log(this.resolution);

//         /* @vite-ignore */
//         // let P = await import(`./${e}/particle.js`);

//         for (let i = 0; i < this.particleCount; i++) {

//             // this.particles.push(new Particle(Math.random() * 50, Math.random() * 50, this));
//             this.particles.push(new Particle(Math.random() * 50, Math.random() * 50, this));
//         }
//     }

//     render() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

//         // this.context.font = '400px serif';
//         // this.context.textAlign = 'center';
//         // this.context.textBaseline = 'middle';
//         // this.context.fillStyle = 'white';
//         // this.context.fillText('b', this.canvas.width / 2, this.canvas.height / 2);

//         // for (let i = 0; i < this.flowField.length;i++) {
//         //     this.flowField[i] += 0.001;
//         // }

//         for (const particle of this.particles) {
//                 particle.draw();
//         }
//     }

//     contained(x: number, y: number) {
//         return x < this.canvas.width && x > 0 && y < this.canvas.height && y > 0;
//     }
// }
