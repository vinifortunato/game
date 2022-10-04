import { screenToWorld } from '../../utils/position';
import GameObject from '../GameObject';

class Map extends GameObject {

	constructor() {
		super({ x: 0, y: 0 });

		this.tiles = [];
		this.rows = 100;
		this.columns = 100;
		this.tileWidth = 50;
		this.tileHeight = 50;
	}

	build() {
		for(var row = 0; row < this.rows; row++) {
			const x = row * this.tileWidth;
			if (!this.tiles[row]) {
				this.tiles[row] = [];
			}
			for(var column = 0; column < this.columns; column++) {
				const y = column * this.tileHeight;
				const tile = {
					x,
					y,
					content: null
				};
				this.tiles[row][column] = tile;
			}
		}
		console.log('Map build complete');
	}

	update(deltaTime, keyHandler, camera) {
		if (keyHandler.keys['mouseLeft']) {
			const mouseClickDetails = keyHandler.keys['mouseLeft'];
			const worldPosition = screenToWorld(mouseClickDetails.x, mouseClickDetails.y, camera.position);

			const tileX = Math.floor(worldPosition.x / this.tileWidth);
			const tileY = Math.floor(worldPosition.y / this.tileHeight);

			const tile = this.getTile(tileX, tileY);
			if (tile) {
				console.log('Click on tile', tile);
			}

		}
	}

	render(context) {
		for(let row = 0; row < this.rows; row++) {
			for(let column = 0; column < this.columns; column++) {
				const tile = this.tiles[row][column];
				this.renderTile(context, tile);
			}
		}
	}

	renderTile(context, tile) {
		const { x, y, content } = tile;
		context.beginPath();
		context.fillStyle = '#fff';

		const parsedX = x;
		const parsedY = y;

		if (content) {
			const { id } = content;
			context.fillStyle = content.color;
			context.fillRect(parsedX, parsedY, this.tileWidth, this.tileHeight);

			if (id === 'house') {
				const { residents } = content;
				context.font = '14px Arial';
				context.fillStyle = '#000';
				context.textAlign = 'center';
				context.fillText(residents, parsedX + this.tileWidth / 2, parsedY + 7 + this.tileHeight / 2);
			}

			if (id === 'business') {
				const { jobs } = content;
				context.font = '14px Arial';
				context.fillStyle = '#fff';
				context.textAlign = 'center';
				context.fillText(`${jobs.occupied}/${jobs.available}`, parsedX + this.tileWidth / 2, parsedY + 7 + this.tileHeight / 2);
			}

			if (id === 'industry') {
				const { jobs } = content;
				context.font = '14px Arial';
				context.fillStyle = '#000';
				context.textAlign = 'center';
				context.fillText(`${jobs.occupied}/${jobs.available}`, parsedX + this.tileWidth / 2, parsedY + 7 + this.tileHeight / 2);
			}
		} else {
			context.fillRect(parsedX, parsedY, this.tileWidth, this.tileHeight);
		}

		context.strokeStyle = '#D3D3D3';
		context.rect(parsedX, parsedY, this.tileWidth, this.tileHeight);
		context.stroke();
		context.closePath();
	}

	getTile(x, y) {
		try {
			const tile = this.tiles[x][y];
			return tile;
		} catch(e) {
			return null;
		}
	}
}

export default Map;
