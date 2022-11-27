/*
Game

Utils:
https://spicyyoghurt.com/tutorials/html5-javascript-game-development
*/

import '../public/style.css';
import { Car, Map } from './gameObjects';
import Camera from './gameObjects/Camera';

import GameObject from './gameObjects/GameObject';
import { KeyHandler } from './handlers';
import { Context } from './types/CommonTypes';

let canvas: HTMLCanvasElement | undefined = undefined;
let context: Context | null = null;

let oldTimeStamp = 0;
let fps = 0;

const gameObjects: Array<GameObject> = [];

const map = new Map();
gameObjects.push(map);

const camera = new Camera();
gameObjects.push(camera);

const car = new Car({ x: 500, y: 0 });
gameObjects.push(car);

window.onload = init;

function init() {
	canvas = document.createElement('canvas');
	canvas.id = 'game';
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const body = document.getElementsByTagName('body')[0];
	body.appendChild(canvas);

	window.addEventListener('resize', handleWindowResize);

	context = canvas.getContext('2d');

	map.build();

	window.requestAnimationFrame(gameLoop);

	console.log('Init complete!');
}

function handleWindowResize() {
	if (!canvas) {
		return;
	}
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

function gameLoop(timeStamp: number) {
	const deltaTime = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;
	fps = Math.round(1 / deltaTime);

	update(deltaTime);
	render();

	window.requestAnimationFrame(gameLoop);
}

function update(deltaTime: number) {
	gameObjects.forEach((gameObject: GameObject) => {
		gameObject.update(deltaTime);
	});
}

function render() {
	if (!canvas) {
		console.error('Invalid canvas');
		return;
	}

	if (!context) {
		console.error('Invalid context');
		return;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.save();

	const cameraPosition = camera.getPosition();
	context.translate(-cameraPosition.x, -cameraPosition.y);

	gameObjects.forEach((gameObject: GameObject) => {
		if (!context) {
			return;
		}
		gameObject.render(context);
	});

	context.restore();

	renderStats(context);
}

function renderStats(context: Context) {
	if (!canvas) {
		return;
	}

	// FPS
	context.font = '14px Arial';
	context.textAlign = 'right';
	context.fillStyle = '#000';
	context.fillText(`FPS: ${fps}`, canvas.width - 5, 20);

	// Canvas size
	context.font = '14px Arial';
	context.textAlign = 'right';
	context.fillStyle = '#000';
	context.fillText(`w: ${canvas.width} h: ${canvas.height}`, canvas.width - 5, 40);

	// Mouse position
	context.font = '14px Arial';
	context.textAlign = 'right';
	context.fillStyle = '#000';
	context.fillText(`Mouse x: ${Math.floor(KeyHandler.getInstance().mousePosition.x)} y: ${Math.floor(KeyHandler.getInstance().mousePosition.y)}`, canvas.width - 5, 60);

	// Camera position
	context.font = '14px Arial';
	context.textAlign = 'right';
	context.fillStyle = '#000';
	context.fillText(`Camera x: ${Math.floor(-camera.getPosition().x)} y: ${Math.floor(-camera.getPosition().y)}`, canvas.width - 5, 80);
}
