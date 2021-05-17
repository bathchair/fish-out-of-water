import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu2A extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene);   
        this.addMenuItem("Big bad hermit crabs");
        this.addMenuItem("A clog in Sewertopia")
        this.addMenuItem("Oily drains");
        this.addMenuItem("Tree roots");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("B1","A");
                break;
            case 1:
                this.scene.registry.set("B1","B");
                break;
            case 2:
                this.scene.registry.set("B1","C");
                break;
            case 3:
                this.scene.registry.set("B1","D");
                break;
        }        
    }
    
}