import { Events } from "matter";
import Level from "../scenes/level";
import Menu from "./Menu";

export class QuestionMenu1A extends Menu  {
    
    constructor(x, y, scene) {
        super(x, y, scene); 
        this.addMenuItem("It can cool and clog up the pipes");
        this.addMenuItem("Grease can and should go down the drain")
        this.addMenuItem("It kills bacteria in the drain");
        this.addMenuItem("It makes plants grow in the pipes");

    }

    confirm() {
        var index = this.getMenuItemIndex();
        switch (index) {
            case 0:
                this.scene.registry.set("A1","A");
                break;
            case 1:
                this.scene.registry.set("A1","B");
                break;
            case 2:
                this.scene.registry.set("A1","C");
                break;
            case 3:
                this.scene.registry.set("A1","D");
                break;
        }        
    }
    
}