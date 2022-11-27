import { KeyHandler } from '../../handlers';
import { Context, TileMap } from '../../types/CommonTypes';
import { screenToWorld } from '../../utils/position';
import Camera from '../Camera';
import GameObject from '../GameObject';
import Tile from '../Tile';
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
		for(let row = 0; row < this.rows; row++) {
			const x = row * this.tileWidth;
			if (!this.tiles[row]) {
				this.tiles[row] = [];
			}
			for(let column = 0; column < this.columns; column++) {
				const y = column * this.tileHeight;
				this.tiles[row][column] = new Tile({ x, y }, this.tileWidth, this.tileHeight);
			}
		}
		// eslint-disable-next-line no-console
		console.log('Map build complete');
	}

	update() {

		if (KeyHandler.getInstance().keys['mouseLeft']) {
			const worldPosition = screenToWorld(KeyHandler.getInstance().mousePosition, Camera.getInstance().getPosition());

			const tileX = Math.floor(worldPosition.x / this.tileWidth);
			const tileY = Math.floor(worldPosition.y / this.tileHeight);

			const tile = this.getTile(tileX, tileY);
			if (tile) {
				// eslint-disable-next-line no-console
				console.log('Click on tile', tile);
			}

		}
	}

	render(context: Context) {
		for(let row = 0; row < this.rows; row++) {
			for(let column = 0; column < this.columns; column++) {
				const tile = this.tiles[row][column];
				tile.render(context);
			}
		}
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
