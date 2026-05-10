import { Viewport } from "./render/viewport.js";
import { Renderer } from "./render/renderer.js";
import { Session } from "./app/session.js";

const session = new Session();
const viewport = new Viewport();
const renderer = new Renderer(viewport);

export let frameCount = 0;

function render() {
  frameCount++;
  renderer.render(session.getCube());
  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
  viewport.resize();
  render();
});