export class Viewport {
    constructor(canvasId = "canvas") {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) throw new Error(`Canvas element not found: ${canvasId}`);
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.scale = 1;
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.scale = Math.min(this.width, this.height);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    worldToScreen(x, y) {
        return {
            x: this.centerX + x * this.scale,
            y: this.centerY - y * this.scale // Y coordinate is inverted because y+ is Up and everyone else is Wrong
        };
    }
    drawPoint(x, y, color) {
        const screen = this.worldToScreen(x, y);
        this.ctx.beginPath();
        this.ctx.arc(screen.x, screen.y, 3, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
}