import { Physics } from "phaser";
import Enemy from "../objects/Enemy";
import HealthBar from "../objects/HealthBar";
//import HealthBar from "../objects/HealthBar";
import PlayerCharacter from "../objects/PlayerCharacter";
import Unit from "../objects/Unit";

export default class BattleScene extends Phaser.Scene {
    background: any;
    heroes: Unit[];
    activeID: number;
    activeHero: Unit;
    activeHeroHP: number;
    activeEnemy: Unit;
    enemies: Unit[];
    units: any[];
    index: number;
    exitBattle: Function | undefined;
    victory: boolean;
    surrenderFlag: boolean;
    playerHealth: HealthBar;
    playerHP: number;
    enemyHealth: HealthBar;
    setEnemies: Enemy[];
    timesInCombat: number;
    prevScene: any;
    fightPos1: number;
    fightPos2: number;
    enemiesList: (PlayerCharacter | Enemy)[];
    activeEnemyIndex: number;
    fightHeight: number;

    constructor() {
        super({ key: "BattleScene" });
    }

    create() {  
        this.scene.launch("BattleIntro"); 

        this.time.addEvent({ delay: 3000, callback: this.begin, callbackScope: this });
    }

    begin() {
        this.background = this.add.image(0,0,'sewer-combat').setOrigin(0); 
        // Run UI Scene at the same time

        this.scene.launch("UIScene");
        this.startBattle(); 

        this.sys.events.on('wake', this.wake, this);  
    }

    startBattle() {

        let height = this.game.config.height as number;
        let width = this.game.config.width as number;

        this.fightHeight = height/2 - 50;
        this.fightPos1 = width * .8;
        this.fightPos2 = width * .2;

        this.victory = false;
        this.surrenderFlag = false;
        this.playerHP = 100;

        this.generateHeroes();

        this.generateEnemies();

        this.activeID = 0;
        this.activeHero = this.heroes[this.activeID];
        this.playerHP;
        this.activeEnemyIndex = Math.floor(Math.random() * this.enemiesList.length);
        this.activeEnemy = this.enemiesList[this.activeEnemyIndex];
        //this.activeEnemy = this.enemiesList[4];
        this.add.existing(this.activeEnemy);
        this.activeEnemy.anims.play(this.activeEnemy.getTexture());
        this.enemies = [ this.activeEnemy ];

        // checks who is the opponent
        this.updateDamages();

        // array with both parties, who will attack
        this.units = [this.activeHero];
        this.units = this.units.concat(this.enemies);
        this.timesInCombat = 1;
        
        this.playerHealth = new HealthBar(this, this.fightPos1, this.activeHero.y - 100, this.activeHero);
        this.enemyHealth = new HealthBar(this, this.fightPos2, this.activeEnemy.y - 100, this.activeEnemy);

        this.index = -1;      
    }

    updateDamages() {
        this.activeHero.setDamageForEnemy(this.activeEnemy);
        this.activeEnemy.setDamageForEnemy(this.activeHero);
    }

    generateHeroes() {
        // main combat character
        var fish = new PlayerCharacter(this, this.fightPos1, this.fightHeight, "combat", null, "Fish", this.playerHP, "fish", 2);        
        this.add.existing(fish)
        fish.anims.play('combat-flounder');
        fish.setDescription("Name: Fish\nHealth: 100HP\nYour basic fish.\nNo strengths/weaknesses.")

        var orca = new PlayerCharacter(this, this.fightPos1, this.fightHeight, "shift-orca", null, "Orca", this.playerHP, "orca", 3);
        this.add.existing(orca)
        orca.visible = false;
        orca.setDescription("Name: Orca\nHealth: 100HP\nStrengths: Apex predator\nWeaknesses: pollution");

        var shrimp = new PlayerCharacter(this, this.fightPos1, this.fightHeight, "shift-shrimp", null,"Shrimp", this.playerHP, "shrimp", 1);
        this.add.existing(shrimp)
        shrimp.visible = false;
        shrimp.setDescription("Name: Shrimp\nHealth: 100HP\nStrengths: abundant\nWeaknesses: natural prey");

        // array with heroes
        this.heroes = [ fish, orca, shrimp ];
    }

    generateEnemies() {
        // enemy options
        var jelly = new Enemy(this, this.fightPos2, this.fightHeight, "enemy-jellyfish", null, "Jelly", this.playerHP, "jellyfish", 2);
        var orcaE = new Enemy(this, this.fightPos2, this.fightHeight, "shift-orca", null, "Orca", 100, "orca", 3); 
        var swordE = new Enemy(this, this.fightPos2, this.fightHeight, "enemy-swordfish", null, "Swordfish", 85, "swordfish", 3);
        var anglarE = new Enemy(this, this.fightPos2, this.fightHeight, "enemy-anglar", null, "Anglar", 80, "anglarfish", 2);
        var crabE = new Enemy(this, this.fightPos2, this.fightHeight, "enemy-crab", null, "Crab", 100, "crab", 2);
        crabE.setScale(3);
        // array with enemies
        this.enemiesList = [ jelly, orcaE, swordE, anglarE, crabE ]
    }

    setHostScene(sceneKey) {
        this.prevScene = sceneKey;
    }

    getPlayerHealth() {
        return this.playerHealth;
    }

    getEnemyHealth() {
        return this.enemyHealth;
    }

    wake() {
        this.scene.launch("BattleIntro");
        this.time.addEvent({ delay: 3000, callback: this.wakePartTwo, callbackScope: this });
    }

    wakePartTwo() {
        this.victory = false
        this.surrenderFlag = false;

        this.background = this.add.image(0,0,'sewer-combat').setOrigin(0); 

        this.scene.wake("UIScene");

        this.startBattle();
    }

    shapeShiftHero(index) {
        var tempHP = this.activeHero.getHP();
        var tempHero = this.activeHero;
        this.activeID = index;
        this.activeHero = this.heroes[this.activeID];
        this.activeHero.setHP(tempHP);
        this.updateUnits();
        this.activeHero.shapeShift(tempHero);
        tempHero.visible = false;
        this.activeHero.visible = true;
        let tempString = this.activeHero.name;
        this.activeHero.anims.play('shift-' + tempString);

        this.updateDamages();
    }

    getInfo(index) {
        this.events.emit("Message", this.heroes[index].getDescription());
    }

    updateUnits() {
        this.units[0] = this.activeHero;
        this.playerHealth.updateEntity(this.activeHero);
    }

    nextTurn() {
        if(this.checkEndBattle() || this.surrenderFlag || !this.activeHero.isAlive()) {           
            this.endBattleDisplay();
            return;
        }
        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
            this.index = 0;
        }
        if(this.units[this.index]) {
            // if its player hero
            if(this.units[this.index] instanceof PlayerCharacter) {                
                this.events.emit("PlayerSelect", this.index);
            } else { // else if its enemy unit
                this.units[this.index].attack(this.activeHero);  
                // add timer for the next turn, so will have smooth gameplay
                this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
            }
            this.playerHP = this.activeHero.getHP();
        }
    }

    // when the player have selected the enemy to be attacked
    receivePlayerSelection(action, target) {
        if(action == "attack") {            
            this.units[this.index].attack(this.enemies[target]);   
        }
        else if (action == "shapeshift") {
            this.shapeShiftHero(target);
        }
        else if (action == "getInfo") {
            this.getInfo(target);
            this.index--;                       // makes sure turn is repeated
        }
        else if (action == "surrender") {
            this.surrenderDisplay();
        }
        // next turn in 3 seconds
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    surrenderDisplay() {
        this.events.emit("Message", "Player surrendered!");
        this.victory = false;
        this.surrenderFlag = true;
    }

    endBattleDisplay() {
        var endMessage;
        if (this.victory) {
            endMessage = "You defeated the enemy!"
        }
        else {
            endMessage = "You fainted!"
        }

        this.events.emit("Message", endMessage);
        this.time.addEvent({ delay: 3000, callback: this.endBattle, callbackScope: this });   
    }

    checkEndBattle() {     
        var vict = true;   
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].alive)
                vict = false;
        }
        var loss = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].alive)
                loss = false;
        }

        if (vict) {
            this.victory = true;
        }
        if (loss) {
            this.victory = false;
        }
        return vict || loss;
    }

    endBattle() {       
        // clear state, remove sprites
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].visible = false;            
        }

        // sleep the UI
        this.background.destroy();
        this.playerHealth.destroy();
        this.enemyHealth.destroy();
        this.scene.sleep('UIScene');
        this.scene.switch(this.prevScene);
        this.registry.set("Battle", 1);

    }

    getHeroes() {
        return this.heroes;
    }

    getVictory() {
        return this.victory;
    }
}
