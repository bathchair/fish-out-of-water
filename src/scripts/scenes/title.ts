var scene = new Phaser.Scene("game");

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene : scene
};

// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
var game = new Phaser.Game(config);

scene.init = function() {

};

scene.preload = function() {

};

scene.create = function() {

};

scene.update = function() {

};


scene.end = function() {

};

this.scene.start('LevelOneScene');