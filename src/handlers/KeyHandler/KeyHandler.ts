import { Dictionary, Vector2D } from '../../types/CommonTypes';

class KeyHandler {

	private static instance: KeyHandler;

	public keys: Dictionary<boolean>;
	public mousePosition: Vector2D;

	private mouseKeys: Dictionary<string>;

	constructor() {
		this.keys = {};

		this.mouseKeys = {
			0: 'mouseLeft',
			1: 'mouseMiddle',
			2: 'mouseRight'
		};

		this.mousePosition = { x: 0, y: 0 };

		document.addEventListener('keydown', (event) => {
			const keyName = event.key;
			this.handleKeyDown(keyName);
		});

		document.addEventListener('keyup',  (event) => {
			const keyName = event.key;
			this.handleKeyUp(keyName);
		});

		document.addEventListener('mousedown', (event) => {
			const keyName = this.mouseKeys[event.button];
			this.handleKeyDown(keyName);
		});

		document.addEventListener('mouseup', (event) => {
			const keyName = this.mouseKeys[event.button];
			this.handleKeyUp(keyName);
		});

		document.addEventListener('mousemove', (event) => {
			this.handleMousePosition({ x: event.clientX, y: event.clientY });
		});
	}

	public static getInstance(): KeyHandler {
		if (!KeyHandler.instance) {
			KeyHandler.instance = new KeyHandler();
		}
		return KeyHandler.instance;
	}

	private handleKeyDown(keyName: string): void {
		this.keys[keyName] = true;
	}

	private handleKeyUp(keyName: string): void {
		this.keys[keyName] = false;
	}

	private handleMousePosition(position: Vector2D): void {
		this.mousePosition = position;
	}
}

export default KeyHandler;
