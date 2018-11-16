import Vector from "../vector";

export default function (v1: Vector, v2: Vector) {
    return Math.sqrt(
              Math.pow(v1.x - v2.x, 2) +
                 Math.pow(v1.y - v2.y, 2) +
                 Math.pow(v1.z - v2.z, 2)
    )
}