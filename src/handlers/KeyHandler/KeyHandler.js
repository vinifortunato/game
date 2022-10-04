class KeyHandler {

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
			const details = {
				x: event.x,
				y: event.y
			};
			this.handleKeyDown(keyName, details);
		});

		document.addEventListener('mouseup', (event) => {
			const keyName = this.mouseKeys[event.button];
			this.handleKeyUp(keyName);
		});
	}

	handleKeyDown(keyName, details = true) {
		console.log(`${keyName} down`, details);
		this.keys[keyName] = details;
	}

	handleKeyUp(keyName, details = false) {
		console.log(`${keyName} up`, details);
		this.keys[keyName] = details;
	}
}

export default KeyHandler;
