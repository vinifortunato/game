import { Vector2D } from '../../types/CommonTypes';

export const screenToWorld = (position: Vector2D, cameraPosition: Vector2D) => {
	return { x: position.x + cameraPosition.x, y: position.y + cameraPosition.y };
};

export const worldToScreen = (position: Vector2D, cameraPosition: Vector2D) => {
	return { x: position.x - cameraPosition.x, y: position.y - cameraPosition.y };
};

