export class Sprite {
    constructor(position, canvasContext) {
        this.position = position;
        this.context = canvasContext;
    }

    draw() {
        const { x, y } = this.position;
        this.context.fillStyle = 'red';
        this.context.fillRect(x, y, 20, 40);
    }
}