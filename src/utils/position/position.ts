export const screenToWorld = (x: number, y: number, camera: any) => {
	return { x: x + camera.x, y: y + camera.y };
};

export const worldToScreen = (x: number, y: number, camera: any) => {
	return { x: x - camera.x, y: y - camera.y };
};

