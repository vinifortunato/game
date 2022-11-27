import { KeyHandler } from '../../handlers';
import { Context, Tile, TileMap } from '../../types/CommonTypes';
import { screenToWorld } from '../../utils/position';
import GameObject from '../GameObject';

class Map extends GameObject {

    private columns: number;
    private rows: number;
    private tileHeight: number;
    private tiles: TileMap;
    private tileWidth: number;

	constructor() {
		super({});
		this.columns = 100;
		this.rows = 100;
		this.tileHeight = 50;
		this.tiles = [];
		this.tileWidth = 50;
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

	update(deltaTime: number) {
        const keyHandler = KeyHandler.getInstance();

		if (keyHandler.keys['mouseLeft']) {
			// const mouseClickDetails = keyHandler.keys['mouseLeft'];
			// const worldPosition = screenToWorld(mouseClickDetails.x, mouseClickDetails.y, camera.position);

			// const tileX = Math.floor(worldPosition.x / this.tileWidth);
			// const tileY = Math.floor(worldPosition.y / this.tileHeight);

			// const tile = this.getTile(tileX, tileY);
			// if (tile) {
				// console.log('Click on tile', tile);
			//}

		}
	}

	render(context: Context) {
		for(let row = 0; row < this.rows; row++) {
			for(let column = 0; column < this.columns; column++) {
				const tile = this.tiles[row][column];
				this.renderTile(context, tile);
			}
		}
	}

	renderTile(context: Context, tile: Tile) {
		const { x, y, details } = tile;
		context.beginPath();
		context.fillStyle = '#fff';

		const parsedX = x;
		const parsedY = y;

		if (details) {
			context.fillRect(parsedX, parsedY, this.tileWidth, this.tileHeight);
		} else {
			context.fillRect(parsedX, parsedY, this.tileWidth, this.tileHeight);
		}

		context.strokeStyle = '#D3D3D3';
		context.rect(parsedX, parsedY, this.tileWidth, this.tileHeight);
		context.stroke();
		context.closePath();
	}

	getTile(x: number, y: number): Tile | null {
		try {
			const tile = this.tiles[x][y];
			return tile;
		} catch(e) {
			return null;
		}
	}
}

export default Map;
