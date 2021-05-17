import { QuestionMenu2A } from "../objects/QuestionMenu2A";
export default class QuestionScene2A extends Phaser.Scene {
    menus: Phaser.GameObjects.Container;
    currentMenu: any;
    txt: Phaser.GameObjects.Text;
    QuestionMenu2A: QuestionMenu2A;

    constructor() {
        super({ key: 'QuestionScene2A' });
    }

    create(){
        this.cameras.main.setBackgroundColor("0x8B8BAE");
        //font, color, etc. can be changed later
        this.txt = this.add.text(0,100,'If there are bad odors and collapsing pipes, what might be the cause?');
        //menu for selecting answer
        this.menus = this.add.container();
        this.QuestionMenu2A = new QuestionMenu2A(118, 153, this);  
        this.currentMenu = this.QuestionMenu2A;
        this.menus.add(this.QuestionMenu2A);

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
                this.game.scene.stop('QuestionScene2A');
                this.registry.set("Question","2");


            } 
        }
    }
}

