import { KeyHandler } from '../../handlers';
import { Context, Vector2D } from '../../types/CommonTypes';
import GameObject from '../GameObject';

class Car extends GameObject {

	private moveSpeed: number;
	private friction: number;

	constructor(position: Vector2D) {
		super({ position, size: { x: 20, y: 20 } });
		this.moveSpeed = 50;
		this.friction = 0.9;
	}

	update(deltaTime: number) {
		const keyHandler = KeyHandler.getInstance();

		// Horizontal movement
		if (keyHandler.keys['a']) {
			this.velocity.x -= this.moveSpeed;
		}
		if (keyHandler.keys['d']) {
			this.velocity.x += this.moveSpeed;
		}
		// Vertical movement
		if (keyHandler.keys['w']) {
			this.velocity.y -= this.moveSpeed;
		}
		if (keyHandler.keys['s']) {
			this.velocity.y += this.moveSpeed;
		}

		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		this.velocity.x *= this.friction;
		this.velocity.y *= this.friction;
	}

	render(context: Context) {
		context.beginPath();
		context.fillStyle = 'blue';
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

		context.beginPath();
		context.strokeStyle = '#000';
		const center = { x: this.position.x + this.size.x / 2, y: this.position.y + this.size.y / 2 };
		context.moveTo(center.x, center.y);
		context.lineTo(center.x + this.velocity.x, center.y + this.velocity.y);
		context.stroke();
	}

}

export default Car;
