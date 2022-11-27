import { Context, Vector2D } from '../../types/CommonTypes';
import GameObject from '../GameObject';

class Tile extends GameObject {

	private height: number;
	private width: number;

	constructor(position: Vector2D, width = 50, height = 50) {
		super({});
		this.position = position;
		this.height = height;
		this.width = width;
	}

	update() {
		// todo
	}

	render(context: Context) {
		context.beginPath();
		context.fillStyle = '#fff';

		context.fillRect(this.position.x, this.position.y, this.width, this.height);

		context.strokeStyle = '#D3D3D3';

		context.rect(this.position.x, this.position.y, this.width, this.height);
		context.stroke();
		context.closePath();
	}
}

export default Tile;
