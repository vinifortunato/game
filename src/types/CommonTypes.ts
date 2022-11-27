import Tile from '../gameObjects/Tile';

export type Vector2D = {
    x: number
    y: number
}

export type Context = CanvasRenderingContext2D;

export type Dictionary<T> = {
    [key: string]: T;
};

export type TileMap = Tile[][];
