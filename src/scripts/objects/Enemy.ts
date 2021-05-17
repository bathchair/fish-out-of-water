import Unit from "./Unit";

export default class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, name, creature) {
        super(scene, x, y, texture, frame, type, hp, name, creature);
        this.setScale(0.5);
    }
}