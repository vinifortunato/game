import { Dictionary } from '../../types/CommonTypes';

class KeyHandler {

    private static instance: KeyHandler;

    keys: Dictionary<boolean>;
    mouseKeys: Dictionary<string>;

	constructor() {
		this.keys = {};

		this.mouseKeys = {
			0: 'mouseLeft',
			1: 'mouseMiddle',
			2: 'mouseRight'
		};

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
	}

	handleKeyDown(keyName: string, details = true) {
		console.log(`${keyName} down`, details);
        this.keys[keyName] = true;
	}

	handleKeyUp(keyName: string, details = false) {
		console.log(`${keyName} up`, details);
        this.keys[keyName] = false;
	}

    public static getInstance(): KeyHandler {
        if (!KeyHandler.instance) {
            KeyHandler.instance = new KeyHandler();
        }
        return KeyHandler.instance;
    }
}

export default KeyHandler;
