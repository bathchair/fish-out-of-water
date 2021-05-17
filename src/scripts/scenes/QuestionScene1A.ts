import { QuestionMenu1A } from "../objects/QuestionMenu1A";
export default class QuestionScene1A extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu1A: QuestionMenu1A;

    constructor() {
        super({ key: 'QuestionScene1A' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'Why should grease not go down the drain?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu1A = new QuestionMenu1A(118, 153, this);  
        this.currentMenu = this.QuestionMenu1A;
        this.menus.add(this.QuestionMenu1A);
        this.input.keyboard.on("keydown", this.onKeyInput, this);               
    }


    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "Space") {
                this.currentMenu.confirm();
                this.game.scene.stop('QuestionScene1A');
                this.registry.set("Question","1");


            } 
        }
    }
}

