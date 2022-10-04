import GameObject from '../GameObject';

class Car extends GameObject {

	constructor(props) {
		super({ ...props });
		this.moveSpeed = 50;
		this.friction = 0.9;
	}

	update(deltaTime, keyHandler) {
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

	render(context) {
		context.beginPath();
		context.fillStyle = 'blue';
		context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);

		context.beginPath();
		context.strokeStyle = '#000';
		const center = { x: this.position.x + this.size.w / 2, y: this.position.y + this.size.h / 2 };
		context.moveTo(center.x, center.y);
		context.lineTo(center.x + this.velocity.x, center.y + this.velocity.y);
		context.stroke();
	}

}

export default Car;
