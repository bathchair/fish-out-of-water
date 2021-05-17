import { QuestionMenu5A } from "../objects/QuestionMenu5A";
export default class QuestionScene5A extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu5A: QuestionMenu5A;

    constructor() {
        super({ key: 'QuestionScene5A' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'What are the 3 P’s you should flush down the toilet?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu5A = new QuestionMenu5A(118, 153, this);  
        this.currentMenu = this.QuestionMenu5A;
        this.menus.add(this.QuestionMenu5A);

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
                this.game.scene.stop('QuestionScene5A');
                this.registry.set("Question","5");


            } 
        }
    }
}

