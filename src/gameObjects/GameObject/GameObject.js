class GameObject {

	constructor({ position = { x: 0, y: 0 }, size = { w: 10,h: 10 }, velocity = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = size;
		this.velocity = velocity;
	}

	get position() {
		return this._position;
	}

	set position(value) {
		this._position = value;
	}

	get size() {
		return this._size;
	}

	set size(value) {
		this._size = value;
	}

	get velocity() {
		return this._velocity;
	}

	set velocity(value) {
		this._velocity = value;
	}

}

export default GameObject;
