import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu3A extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("special air pumps");
        this.addMenuItem("gravity")
        this.addMenuItem("helper fish");
        this.addMenuItem("applebees");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("C1","A");
                break;
            case 1:
                this.scene.registry.set("C1","B");
                break;
            case 2:
                this.scene.registry.set("C1","C");
                break;
            case 3:
                this.scene.registry.set("C1","D");
                break;
        }        
    }
    
}