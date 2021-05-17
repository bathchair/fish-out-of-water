import { QuestionMenu3A } from "../objects/QuestionMenu3A";
export default class QuestionScene3A extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu3A: QuestionMenu3A;

    constructor() {
        super({ key: 'QuestionScene3A' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'What helps waste go through the pipes?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu3A = new QuestionMenu3A(118, 153, this);  
        this.currentMenu = this.QuestionMenu3A;
        this.menus.add(this.QuestionMenu3A);

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
                this.game.scene.stop('QuestionScene3A');
                this.registry.set("Question","3");


            } 
        }
    }
}

