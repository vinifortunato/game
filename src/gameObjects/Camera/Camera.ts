import { KeyHandler } from '../../handlers';
import { Context } from '../../types/CommonTypes';
import GameObject from '../GameObject';

class Camera extends GameObject {

    private moveSpeed: number;
    private friction: number;

	constructor() {
		super({});
		this.velocity = { x: 0, y: 0 };
		this.moveSpeed = 50;
		this.friction = 0.9;
	}

	update(deltaTime: number) {
        const keyHandler = KeyHandler.getInstance();

		// Horizontal movement
		if (keyHandler.keys['ArrowLeft']) {
			this.velocity.x -= this.moveSpeed;
		}
		if (keyHandler.keys['ArrowRight']) {
			this.velocity.x += this.moveSpeed;
		}
		// Vertical movement
		if (keyHandler.keys['ArrowUp']) {
			this.velocity.y -= this.moveSpeed;
		}
		if (keyHandler.keys['ArrowDown']) {
			this.velocity.y += this.moveSpeed;
		}

		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		this.velocity.x *= this.friction;
		this.velocity.y *= this.friction;
	}

	render(context: Context) {
		const { x, y } = this.position;

		context.beginPath();
		context.fillStyle = 'red';
		context.fillRect(x, y, 10, 10);
	}

}

export default Camera;
