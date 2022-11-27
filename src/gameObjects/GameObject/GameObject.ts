import { Context, Vector2D } from "../../types/CommonTypes";

abstract class GameObject {

    protected position: Vector2D;
    protected size: Vector2D;
    protected velocity: Vector2D;

	constructor({ position = { x: 0, y: 0 }, size = { x: 10, y: 10 }, velocity = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = size;
		this.velocity = velocity;
	}

	public getPosition(): Vector2D {
		return this.position;
	}

	public setPosition(value: Vector2D) {
		this.position = value;
	}

	public getSize(): Vector2D {
		return this.size;
	}

	public setSize(value: Vector2D) {
		this.size = value;
	}

	public getVelocity(): Vector2D {
		return this.velocity;
	}

	public setVelocity(value: Vector2D) {
		this.velocity = value;
	}

    abstract update(deltaTime: number): void;

    abstract render(context: Context): void;

}

export default GameObject;
