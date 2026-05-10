import { Viewport } from "./render/viewport.js";
import { Renderer } from "./render/renderer.js";
import { Session } from "./app/session.js";

const session = new Session();
const viewport = new Viewport();
const renderer = new Renderer(viewport);

function render() {
  renderer.render(session.getCube());
}

render();

window.addEventListener("resize", () => {
  viewport.resize();
  render();
});