import BattleScene from "../scenes/BattleScene";
import BossBattleScene from "../scenes/BossBattleScene";
import Enemy from "./Enemy";
import HealthBar from "./HealthBar";

export default class Unit extends Phaser.GameObjects.Sprite {
    maxHP: number;
    hp: number;
    damage: any;
    alive: boolean;
    scene: BattleScene;
    name: string;
    healthBar: HealthBar;
    description: string;
    tex: string;
    creature: number;
    baseDamage: number;

    constructor(scene, x, y, texture, frame, type, hp, name, creature) {
        super(scene, x, y, texture, frame)
        this.baseDamage = 20;
        this.scene = scene;
        this.type = type;
        this.maxHP = hp;
        this.hp = hp;
        this.damage = this.baseDamage; // default damage      
        this.alive = true;    
        this.name = name;    
        this.tex = texture;
        this.creature = creature;
    }

    attack(target) {
        var miss = false;
        var max = this.damage + 10;
        var min = this.damage - 10;
        var randDamage = Math.floor(Math.random() * (max-min+1)) + min;
        var randMiss = Math.floor(Math.random() * 6);
        if (randMiss == 2) {
            miss = true;
            randDamage = 0;
        }
        target.takeDamage(randDamage);

        if (target instanceof Enemy) {
            this.scene.getEnemyHealth().update(target);
            if (miss) {
                this.scene.events.emit("Message", "You missed!");
            } else {
                this.scene.events.emit("Message", "You attack " + target.type + " for " + randDamage + " damage");
            }
        } else {
            this.scene.getPlayerHealth().update(this.scene.activeHero);
            if (miss) {
                this.scene.events.emit("Message", this.type + " missed!");
            } else {
                this.scene.events.emit("Message", this.type + " attacks you for " + randDamage + " damage");
            }
        }
    }

    shapeShift(previous) {
        this.scene.events.emit("Message", previous.getType() + " turned into a " + this.type);
    }

    takeDamage(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
        }
    }

    setHP(hp) {
        this.hp = hp;
    }

    getHP() {
        return this.hp;
    }

    getMaxHP() {
        return this.maxHP;
    }

    isAlive() {
        if (!this.alive) {
            return false;
        }
        return true;
    }

    surrenderDisplay() {
        this.scene.events.emit("Message", "Player surrendered!");
    }

    getType() {
        return this.type;
    }

    getDamage() {
        return this.damage;
    }

    setDamage(x) {
        this.damage = x;
    }

    setDamageForEnemy(enemy: Unit) {
        let enemyCreature = enemy.getCreature();

        let displace = this.creature - enemyCreature;

        switch(displace) {
            case 0:
                this.setDamage(this.baseDamage);
                break;
            case 1:
                this.setDamage(this.baseDamage * 1.2);
                break;
            case 2:
                this.setDamage(this.baseDamage * 1.5);
                break;
            case -1:
                this.setDamage(this.baseDamage * .9);
                break;
            case -2:
                this.setDamage(this.baseDamage * .7);

        }
    }

    getCreature() {
        return this.creature;
    }

    setDescription(desc) {
        this.description = desc;
    }

    getDescription() {
        return this.description;
    }

    getTexture() {
        return this.tex;
    }
}