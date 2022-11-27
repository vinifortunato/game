export type Vector2D = {
    x: number
    y: number
}

export type Context = CanvasRenderingContext2D;

export type Dictionary<T> = {
    [key: string]: T;
};

export type TileDetails = {
    id: string;
}

export type Tile = {
    x: number
    y: number,
    details?: TileDetails
}

export type TileMap = Tile[][];
