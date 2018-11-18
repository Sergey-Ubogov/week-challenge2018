export default class Vector {
    x: number;
    y: number;
    z: number;

    constructor(arg: string) {
        const vector = arg.split('/');
        this.x = Number(vector[0]);
        this.y = Number(vector[1]);
        this.z = Number(vector[2]);
    }

    toString() {
        return `${this.x}/${this.y}/${this.z}`;
    }

    distance(vector: Vector): number {
        return Math.sqrt(
         Math.pow(this.x - vector.x, 2) +
            Math.pow(this.y - vector.y, 2) +
            Math.pow(this.z - vector.z, 2)
        )
    }

    sub(vector: Vector) {
        return new Vector(`${vector.x - this.x}/${vector.y - this.y}/${vector.z - this.z}`);
    }

    manhattanDistance(vector: Vector): number {
        return Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y) + Math.abs(this.z - vector.z)
    }

    chebyshevDistance(vector: Vector): number {
        const newVector = this.sub(vector);

        return Math.max(Math.abs(newVector.x), Math.abs(newVector.y), Math.abs(newVector.z))
    }
}