import { Vector2D } from '../../types/CommonTypes';

export const hover = (position: Vector2D, size: Vector2D, point: Vector2D): boolean => {
	return ((point.x >= position.x && point.x <= position.x + size.x) && (point.y >= position.y && point.y <= position.y + size.y));
};
