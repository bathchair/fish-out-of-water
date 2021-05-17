import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu5A extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("pork, pizza, pepperoni");
        this.addMenuItem("Pee, poop, paper")
        this.addMenuItem("play-dough, poop, pee");
        this.addMenuItem("porcupines, parents, pilers");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("E1","A");
                break;
            case 1:
                this.scene.registry.set("E1","B");
                break;
            case 2:
                this.scene.registry.set("E1","C");
                break;
            case 3:
                this.scene.registry.set("E1","D");
                break;
        }        
    }
    
}