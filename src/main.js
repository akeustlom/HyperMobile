import {ThreeRenderer} from "./render/three_renderer.js";
import { Session } from "./app/session.js";
import { projectNDto3D } from "./render/projection_nd.js";

const session = new Session();

const canvas = document.getElementById("canvas");
const renderer = new ThreeRenderer(canvas);
//renderer.addTestSphere();
renderer.addPieceCenters(session.getCube(), projectNDto3D);
//renderer.render();
// import { Viewport } from "./render/viewport.js";
// import { Renderer } from "./render/renderer.js";

// const viewport = new Viewport();
// const renderer = new Renderer(viewport);

// export let frameCount = 0;

// function render() {
//   frameCount++;
//   renderer.render(session.getCube());
//   requestAnimationFrame(render);
// }

// render();