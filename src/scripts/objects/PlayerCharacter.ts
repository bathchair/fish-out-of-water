import Unit from "./Unit";

export default class PlayerCharacter extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, name, creature) {
        super(scene, x, y, texture, frame, type, hp, name, creature);
        // flip the image so I don"t have to edit it manually
        this.flipX = true;
        
        this.setScale(0.5);
    }
}