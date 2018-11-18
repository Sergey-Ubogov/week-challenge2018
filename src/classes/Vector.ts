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

    add(vector: Vector) {
        return new Vector(`${this.x + vector.x}/${this.y + vector.y}/${this.z + vector.z}`);
    }

    toString() {
        return `${this.x}/${this.y}/${this.z}`;
    }

    equal(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    reverse() {
        return new Vector(`${-this.x}/${-this.y}/${-this.z}`)
    }

    getNormalizeVector() {
        const newX = this.x === 0 ? this.x : this.x/Math.abs(this.x);
        const newY = this.y === 0 ? this.y : this.y/Math.abs(this.y);
        const newZ = this.z === 0 ? this.z : this.z/Math.abs(this.z);
        return new Vector(`${newX}/${newY}/${newZ}`);
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