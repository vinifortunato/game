/*
Game

Utils:
https://spicyyoghurt.com/tutorials/html5-javascript-game-development
*/

import '../public/style.css';

import { Camera, Car, Map } from './gameObjects';
import { KeyHandler } from './handlers';

let canvas = undefined;
let context = undefined;

let oldTimeStamp = 0;
let fps = 0;

const keyHandler = new KeyHandler();
const gameObjects = [];

const map = new Map();
gameObjects.push(map);

const camera = new Camera();
gameObjects.push(camera);

const car = new Car({
	position: { x: 500, y: 0 },
	size: { w: 20, h: 20 }
});
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
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

function gameLoop(timeStamp) {
	const deltaTime = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;
	fps = Math.round(1 / deltaTime);

	update(deltaTime);
	render();

	window.requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
	gameObjects.forEach((gameObject) => {
		gameObject.update(deltaTime, keyHandler, camera);
	});
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.save();
	context.translate(-camera.position.x, -camera.position.y);

	gameObjects.forEach((gameObject) => {
		gameObject.render(context, camera);
	});

	context.restore();

	renderStats(context);
}

function renderStats(context) {
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

	// Camera position
	context.font = '14px Arial';
	context.textAlign = 'right';
	context.fillStyle = '#000';
	context.fillText(`x: ${Math.floor(-camera.position.x)} y: ${Math.floor(-camera.position.y)}`, canvas.width - 5, 60);
}
