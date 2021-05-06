import { Scene } from "phaser";
import Enemy from "./Enemy";
import PlayerCharacter from "./PlayerCharacter";
import Unit from "./Unit";

export default class HealthBar extends Phaser.GameObjects.Container {
    healthGauge: Phaser.GameObjects.Image;
    healthBar: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
    barDisplace: number = 500;
    fullBar: number = 110;
    xCoord: number;
    yCoord: number;
    hpString: string;
    entity: Unit;
    scene: any;

    constructor(scene: Phaser.Scene, x, y, entity)
    {
        super(scene);
        this.scene.add.existing(this);
        this.entity = entity;

        this.xCoord = x;
        this.yCoord = y;
        this.scene = scene;

        this.hpString = this.entity.getHP() + "/" + this.entity.getMaxHP();

        this.healthGauge = new Phaser.GameObjects.Image(scene, x + 5, y, 'shadowbar');
        this.healthBar = new Phaser.GameObjects.Image(scene, x + 5, y + 22, 'healthbar');
        this.nameText = new Phaser.GameObjects.Text(this.scene, this.xCoord + 20, this.yCoord - 50, this.hpString, { color:'#ffffff', fontSize: '12pt', fontStyle: 'bold', fontFamily: 'Courier' } );

        this.healthGauge.setScale(1.5);
        this.healthBar.setScale(1.5);

        if (entity instanceof Enemy) {
            this.healthBar.setTintFill(0xbf0a00);
            this.barDisplace = 120;
        } else {
            this.healthBar.setTintFill(0x4feb70);
        }

        this.healthBar.setCrop(this.xCoord - this.barDisplace, 0, this.fullBar, this.yCoord);

        this.add(this.healthGauge);
        this.add(this.healthBar);
        this.add(this.nameText);

    }

    updateEntity(entity) {
        this.entity = entity;
    }

    update(character: Unit)
    {
        //this.nameText.text = character.name;
        this.hpString = this.entity.getHP() + "/" + this.entity.getMaxHP();
        this.nameText.text = this.hpString;

        var healthPercentage = character.getHP() / character.getMaxHP();
        this.healthBar.setCrop(this.xCoord - this.barDisplace, 0, this.fullBar * healthPercentage, this.yCoord);
    }

}