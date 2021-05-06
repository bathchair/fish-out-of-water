export default class InstructionScene extends Phaser.Scene {

    arrowKeyImg: Phaser.GameObjects.Image;
    spaceHelp: Phaser.GameObjects.Image;
    pollHelp: Phaser.GameObjects.Image;
    prevScene: Phaser.Scene
    currImage: any;
    height: number;
    width: number;
    ind: number;

    constructor() {
        super("InstructionScene");
    }

    create() {
        this.height = this.game.config.height as number;
        this.width = this.game.config.width as number;
        const screenCenterX =  this.cameras.main.width / 2;
        this.ind = 0;
        //const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const titleX = 70;                          // xPosition of title
        const titleY = 30;                          // yPosition of title

        this.cameras.main.setBackgroundColor("0x414535");
        var textStyle = {font: "bold 50px Courier"};
        var title = this.add.text(titleX,titleY,"Fish Out of Water", textStyle);
        title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const subX = 250;                           // xPosition of subtitle   
        const subY = 100;                           // yPosition of subtitle
        var subTitle = this.add.text(subX, subY, "Instructions", {font: "bold 20px Courier"});
        subTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        var specStyle = {font: "18px Courier", fill: 'white', align: 'left', wordWrap: {width: 350, useAdvanceWrap: true}};

        const imgX = 125;

        const specX = 250;
        const moveY = subY + 100;

        this.arrowKeyImg = this.add.image(imgX, moveY, 'arrowKeyHelp');
        this.arrowKeyImg.setScale(0.3);

        var arrowKey = this.add.text(specX, moveY, "Use the arrow keys to move the fish through the maze!", specStyle);
        arrowKey.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const spaceY = moveY + 100;

        this.spaceHelp = this.add.image(imgX, spaceY + 25, 'confirmHelp');
        this.spaceHelp.setScale(0.2);

        var spaceKey = this.add.text(specX, spaceY, "Press spacebar to confirm any actions.", specStyle);
        spaceKey.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const pollY = spaceY + 100;

        this.pollHelp = this.add.image(imgX,pollY + 25,'pollHelp');
        this.pollHelp.setScale(0.1);

        var pollWatch = this.add.text(specX, pollY, "Keep an eye on your pollution meter! Try to get rid of ALL pollution!", specStyle);
        pollWatch.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const exitX = 85;
        const exitY = pollY + 150;
        var exitText = this.add.text(exitX, exitY, "Press 'RIGHT' to read more or 'H' to exit.", {font: "bold 20px Courier"});
        exitText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        // listening for spacebar
        this.input.keyboard.on("keydown", this.onKeyInput, this);
    }

    setHostScene(sceneKey) {
        this.prevScene = sceneKey;
    }

    firstSlide() {
        if (this.currImage != null) {
            this.currImage.destroy();
        }
        var slide = this.add.image(this.width/2,this.height/2,'combatFirst');
        this.currImage = slide;
    }

    secondSlide() {
        this.currImage.destroy();
        var slide = this.add.image(this.width/2,this.height/2,'combatSec');
        slide.setScale(0.95);
        this.currImage = slide;
    }

    displayScene() {
        switch (this.ind) {
            case 0:
                this.currImage.destroy();
                break;
            case 1:
                this.firstSlide();
                break;
            case 2:
                this.secondSlide();
                break;
        }
    }

    // close scene when pressed H
    onKeyInput(event) {
        if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.H) {
            this.scene.switch(this.prevScene);
        } 
        if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.ind--;
            this.displayScene();
        } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.RIGHT) {
            this.ind++;
            this.displayScene();
        }
        
    }

}